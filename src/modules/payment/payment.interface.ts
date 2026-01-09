import { Types } from "mongoose";

export enum PAYMET_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELD = "CANCELED",
  FAILED = "FAILED",
}

export interface IPayment {
  event: Types.ObjectId;
  transactionId: string;
  amount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentGatwayData?: any;
  user: Types.ObjectId;
  status: PAYMET_STATUS;
}