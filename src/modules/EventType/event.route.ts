import { Router } from "express";
import { EventTypeController } from "./type.controller";
import { validateRequest } from "@middlewares/validateRequest";
import { createEventTypeZodSchema } from "./type.validation";
import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "@modules/user/user.interface";

const router = Router();

router.get("/", EventTypeController.getAllEventTypes);
router.get("/:id", EventTypeController.getSingleEventType);
router.post(
  "/",
  checkAuth(UserRoles.ADMIN),
  validateRequest(createEventTypeZodSchema),
  EventTypeController.createEventType
);

export const EventTypeRoutes = router;
