/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@config/env.config";
import { Payment } from "../payment/payment.model";
import { ISSLCommerz } from "./sslCommerz.interface";
import axios from "axios";
import { ApiError } from "@utils/ApiError";

const sslPaymentInit = async (payload: ISSLCommerz) => {
  try {
    const data = {
      store_id: envConfig.ssl_store_id,
      store_passwd: envConfig.ssl_store_pass,
      total_amount: payload.amount,
      currency: "BDT",
      tran_id: payload.transactionId,
      success_url: `${envConfig.ssl_success_backend_url}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
      fail_url: `${envConfig.ssl_fail_backend_url}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
      cancel_url: `${envConfig.ssl_cancel_backend_url}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
      ipn_url: envConfig.ssl_ipn_url,
      shipping_method: "N/A",
      product_name: "Tour",
      product_category: "Service",
      product_profile: "general",
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "N/A",
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };

    const response = await axios({
      method: "POST",
      url: envConfig.ssl_payment_api,
      data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error: any) {
    throw new ApiError(400, error?.message || "SSL Commerz payment init failed");
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${envConfig.ssl_validation_api}?val_id=${payload.val_id}&store_id=${envConfig.ssl_store_id}&store_passwd=${envConfig.ssl_store_pass}`,
    });

    console.log("ssl commerze validated data -->", response.data);

    await Payment.updateOne(
      { transactionId: payload.tran_id },
      { paymentGatwayData: response.data },
      { runValidators: true }
    );
  } catch (error: any) {
    throw new ApiError(400, error.message);
  }
};

export const SSLService = {
  sslPaymentInit,
  validatePayment,
};