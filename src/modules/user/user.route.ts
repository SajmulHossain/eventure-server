import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "./user.interface";

const router = Router();

router.get("/users", checkAuth(UserRoles.ADMIN), UserControllers.getAllUsers);
router.get("/hosts", checkAuth(UserRoles.ADMIN), UserControllers.getAllHosts);
router.get("/admins", checkAuth(UserRoles.ADMIN), UserControllers.getAllAdmins);
router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
