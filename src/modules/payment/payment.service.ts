import { ApiError } from "@utils/ApiError";
import { Payment } from "./payment.model";
import { Event } from "@modules/event/event.modle";
import { SSLService } from "@modules/SSLCommerz/sslCommerz.service";
import { User } from "@modules/user/user.model";
import { getTransactionId } from "@utils/getTransactionId";
import { PAYMET_STATUS } from "./payment.interface";
import mongoose from "mongoose";

const initPayment = async (id: string, userId: string) => {
  const transactionId = getTransactionId();
  const event = await Event.findById(id);
  const user = await User.findById(userId);

  await Payment.create({
    event: event?._id,
    amount: event?.joinning_fee,
    user: user?._id,
    transactionId
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if(event.required_participants <= (event.joinedParticipants.length || 0)){
    throw new ApiError(400, "Not seats available");
  }

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

export const PaymentService = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment,
};
