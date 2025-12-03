import { Router } from "express";
import { EventTypeController } from "./type.controller";
import { validateRequest } from "@middlewares/validateRequest";
import { createEventTypeZodSchema } from "./type.validation";

const router = Router();

router.get("/", EventTypeController.getAllEventTypes)
router.get("/:id", EventTypeController.getSingleEventType)
router.post("/", validateRequest(createEventTypeZodSchema), EventTypeController.createEventType)

export const EventTypeRoutes = router;