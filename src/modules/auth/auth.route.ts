import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { validateRequest } from "@middlewares/validateRequest";
import { userLoginZodSchema, userRegisterZodSchema } from "./auth.validation";

const router = Router();

router.get("/google", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
      failureRedirect: "/auth/failure",
    })(req, res, next);
  }
);

router.post("/login", validateRequest(userLoginZodSchema), AuthController.login);
router.post(
  "/register",
  validateRequest(userRegisterZodSchema),
  AuthController.register
);

export const AuthRoutes = router;