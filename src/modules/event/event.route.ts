import { multerUpload } from "@config/multer.config";
import { checkAuth } from "@middlewares/checkAuth";
import { validateRequest } from "@middlewares/validateRequest";
import { UserRoles } from "@modules/user/user.interface";
import { Router } from "express";
import { EventController } from "./event.controller";
import { eventCreateZodSchema } from "./event.validation";

const router = Router();

router.get("", EventController.getAllEvents);
router.post(
  "",
  checkAuth(UserRoles.HOST),
  multerUpload.single("file"),
  validateRequest(eventCreateZodSchema),
  EventController.createEvent
);

export const EventRoutes = router;
