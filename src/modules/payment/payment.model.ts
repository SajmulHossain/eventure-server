import { model, Schema } from "mongoose";
import { IPayment, PAYMET_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(PAYMET_STATUS),
      default: PAYMET_STATUS.UNPAID,
    },
    paymentGatwayData: {
      type: Schema.Types.Mixed,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = model<IPayment>("Payment", paymentSchema);