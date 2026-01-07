import { Router } from "express";
import { checkAuth } from "@middlewares/checkAuth";
import { validateRequest } from "@middlewares/validateRequest";
import { UserRoles } from "@modules/user/user.interface";
import { RatingController } from "./rating.controller";
import { createRatingZodSchema } from "./rating.validation";

const router = Router();

router.get("", RatingController.getAllRatings);
router.get("/event/:id", RatingController.getRatingsByEvent);
router.get("/host/:id", RatingController.getRatingsByHost);

router.post(
  "",
  checkAuth(UserRoles.USER),
  validateRequest(createRatingZodSchema),
  RatingController.createRating
);

export const RatingRoutes = router;


