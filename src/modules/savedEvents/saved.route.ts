import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "@modules/user/user.interface";
import { Router } from "express";
import { SavedEventController } from "./saved.controller";

const router = Router();

router.get("/:id", checkAuth(...Object.values(UserRoles)), SavedEventController.isSaved);
router.post("/:id", checkAuth(...Object.values(UserRoles)), SavedEventController.createSave);

export const SavedEventRoutes = router;