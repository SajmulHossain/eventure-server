import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "@modules/user/user.interface";
import { Router } from "express";
import { SavedEventController } from "./saved.controller";

const router = Router();

router.post(
  "/",
  checkAuth(...Object.values(UserRoles)),
  SavedEventController.createSave
);
router.get(
  "/",
  checkAuth(...Object.values(UserRoles)),
  SavedEventController.getSavedEvents
);
router.get(
  "/:id",
  checkAuth(...Object.values(UserRoles)),
  SavedEventController.isSaved
);

export const SavedEventRoutes = router;
