import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "@middlewares/validateRequest";
import { userRegisterZodSchema } from "./user.validation";

const router = Router();

router.get("", UserControllers.getAllUsers)
router.post("/register", validateRequest(userRegisterZodSchema), UserControllers.register);

export const UserRoutes = router;