import { ApiError } from "@utils/ApiError";
import { Payment } from "./payment.model";
import { Event } from "@modules/event/event.modle";
import { SSLService } from "@modules/SSLCommerz/sslCommerz.service";
import { User } from "@modules/user/user.model";
import { getTransactionId } from "@utils/getTransactionId";
import { PAYMET_STATUS } from "./payment.interface";
import mongoose, { Types } from "mongoose";
import { EventStatus, IEvent } from "@modules/event/event.interface";
import { UserRoles } from "@modules/user/user.interface";
import { QueryBuilder } from "@utils/QueryBuilder";

const initPayment = async (id: string, userId: string) => {
  const transactionId = getTransactionId();
  const event = await Event.findById(id);
  const user = await User.findById(userId);

  const isAlreadyJoined = event?.joinedParticipants?.some(
    (uid: Types.ObjectId) => uid.toString() === userId
  );

  if (isAlreadyJoined) {
    throw new ApiError(400, "You have already joined this event");
  }

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.status === EventStatus.FULL) {
    throw new ApiError(400, "Event is already full");
  }

  if (
    event.status === EventStatus.CANCELLED ||
    event.status === EventStatus.COMPLETED
  ) {
    throw new ApiError(400, "Cannot join this event");
  }
  if (event.joinedParticipants?.length >= event.required_participants) {
    event.status = EventStatus.FULL;
  }

  if (event.required_participants <= (event.joinedParticipants?.length || 0)) {
    throw new ApiError(400, "Not seats available");
  }

  await Payment.create({
    event: event?._id,
    amount: event?.joinning_fee,
    user: user?._id,
    transactionId,
  });

  await event.save();

  const sslPayment = await SSLService.sslPaymentInit({
    address: user.location as string,
    amount: event.joinning_fee,
    email: user.email as string,
    name: user.name as string,
    transactionId,
  });

  return sslPayment.GatewayPageURL;
};

const successPayment = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: PAYMET_STATUS.PAID,
      },
      { session, runValidators: true }
    );

    if (!updatedPayment) {
      throw new ApiError(404, "Payment info not found");
    }

    await Event.findOneAndUpdate(
      { _id: updatedPayment.event },
      { $push: { joinedParticipants: updatedPayment.user } },
      { session, runValidators: true }
    );

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Payment Completed" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const failPayment = async (query: Record<string, string>) => {
  const updatedPayment = await Payment.findOneAndUpdate(
    { transactionId: query.transactionId },
    { status: PAYMET_STATUS.FAILED },
    { runValidators: true }
  );

  return { success: false, message: "Payment Failed" };
};

const cancelPayment = async (query: Record<string, string>) => {
  await Payment.findOneAndUpdate(
    { transactionId: query.transactionId },
    { status: PAYMET_STATUS.CANCELD },
    { runValidators: true }
  );

  return { success: false, message: "Payment Cancelled" };
};

const getAllPaymentsForUser = async (
  id: string,
  role: string,
  query: Record<string, string>
) => {
  if (role === UserRoles.USER) {
    const paymentsPromise = Payment.find({ user: id })
      .populate("event")
      .populate("user");

    const queryBuilder = new QueryBuilder(paymentsPromise, query);

    const payments = queryBuilder.filter().sort().paginate().search(["status"]);

    const [data, meta] = await Promise.all([
      payments.build(),
      payments.getMeta(),
    ]);

    return { data, meta };
  } else if (role === UserRoles.HOST) {
    const hostEvents = await Event.find({ host_id: id }).select("_id");

    const eventIds = hostEvents.map((event) => event._id);

    const paymentsPromise = Payment.find({
      event: { $in: eventIds },
    })
      .populate("event")
      .populate("user");

    const queryBuilder = new QueryBuilder(paymentsPromise, query);

    const payments = queryBuilder.filter().sort().paginate().search(["status"]);

    const [data, meta] = await Promise.all([
      payments.build(),
      payments.getMeta(),
    ]);

    return { data, meta };
  } else {
    return {
      data: [],
      meta: { total: 0, page: 0, limit: 0 },
    };
  }
};

export const PaymentService = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment,
  getAllPaymentsForUser,
};
