import { multerUpload } from "@config/multer.config";
import { checkAuth } from "@middlewares/checkAuth";
import { validateRequest } from "@middlewares/validateRequest";
import { UserRoles } from "@modules/user/user.interface";
import { Router } from "express";
import { EventController } from "./event.controller";
import { eventCreateZodSchema } from "./event.validation";

const router = Router();

router.get("", EventController.getAllEvents);
router.get("/upcoming", checkAuth(...Object.values(UserRoles)), EventController.getUpcomingEvents);
router.get("/completed", checkAuth(...Object.values(UserRoles)), EventController.getCompletedEvents);
router.get("/my-events", checkAuth(...Object.values(UserRoles)), EventController.getMyEvents);
router.get("/hosted", checkAuth(UserRoles.ADMIN, UserRoles.HOST), EventController.getMyEvents);

router.post(
  "",
  checkAuth(UserRoles.HOST, UserRoles.ADMIN),
  multerUpload.single("file"),
  validateRequest(eventCreateZodSchema),
  EventController.createEvent
);

router.delete("/:id", checkAuth(UserRoles.ADMIN, UserRoles.ADMIN), EventController.deleteEvent);

router.get("/:id", EventController.getSingleEvent);

router.patch(
  "/:id/join",
  checkAuth(UserRoles.USER),
  EventController.handleJoin
);

export const EventRoutes = router;
