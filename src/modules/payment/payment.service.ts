import { ApiError } from "@utils/ApiError";
import { Payment } from "./payment.model";
import { Event } from "@modules/event/event.modle";
import { SSLService } from "@modules/SSLCommerz/sslCommerz.service";
import { User } from "@modules/user/user.model";
import { getTransactionId } from "@utils/getTransactionId";
import { PAYMET_STATUS } from "./payment.interface";

const initPayment = async (id: string, userId: string) => {
  const event = await Event.findById(id);
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!event) {
    throw new ApiError(404, "Booking not found");
  }

  const sslPayment = await SSLService.sslPaymentInit({
    address: user.location as string,
    amount: event.joinning_fee,
    email: user.email as string,
    name: user.name as string,
    transactionId: getTransactionId(),
  });

  return sslPayment.GatewayPageURL;
};

const successPayment = async (query: Record<string, string>) => {
  const updatedPayment = await Payment.findOneAndUpdate(
    { transactionId: query.transactionId },
    { status: PAYMET_STATUS.PAID },
    { runValidators: true }
  );

  if (!updatedPayment) {
    throw new ApiError(404, "Payment info not found");
  }

  return { success: true, message: "Payment Completed" };
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
