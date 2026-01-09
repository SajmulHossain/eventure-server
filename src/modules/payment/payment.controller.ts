import { catchAsync } from "@utils/catchAsync";
import { PaymentService } from "./payment.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "@utils/sendResponse";
import envConfig from "@config/env.config";
import { SSLService } from "@modules/SSLCommerz/sslCommerz.service";

const initPayment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = (req.user as JwtPayload).id;

  const result = await PaymentService.initPayment(id, userId);

  sendResponse(res, {
    statusCode: 200,
    message: "Payment done successfully",
    data: result,
  });
});

const successPayment = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await PaymentService.successPayment(
    query as Record<string, string>
  );

  if (result?.success) {
    res.redirect(
      `${envConfig.ssl_success_frontend_url}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const failPayment = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await PaymentService.failPayment(
    query as Record<string, string>
  );

  if (!result?.success) {
    res.redirect(
      `${envConfig.ssl_fail_frontend_url}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const cancelPayment = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await PaymentService.cancelPayment(
    query as Record<string, string>
  );

  if (!result?.success) {
    res.redirect(
      `${envConfig.ssl_cancel_frontend_url}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const validatePayment = catchAsync(async (req, res) => {
  console.log('ssl ipn ---> ', req.body);
    await SSLService.validatePayment(req.body);

   sendResponse(res, {
     statusCode: 200,
     message: "Payment validated successfully",
     data: null,
   });
});

export const PaymentController = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment,
  validatePayment,
};