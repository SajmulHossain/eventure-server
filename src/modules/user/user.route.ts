import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("", UserControllers.getAllUsers)
router.post("/register", UserControllers.register);

export const UserRoutes = router;