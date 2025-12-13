import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.get("", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
