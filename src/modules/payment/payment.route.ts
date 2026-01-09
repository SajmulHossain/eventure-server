import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "@modules/user/user.interface";

const router = Router();

router.post("/create-intent/:id",checkAuth(...Object.values(UserRoles)), PaymentController.initPayment);
router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
router.post("/validate-payment", PaymentController.validatePayment)
router.get("/user-payments", checkAuth(UserRoles.USER), PaymentController.getAllPaymentsForUser);
router.get("/host-payments", checkAuth(UserRoles.HOST), PaymentController.getAllPaymentsForHost);

export const PaymentRoutes = router;