import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { validateRequest } from "@middlewares/validateRequest";
import {
  changePasswordZodSchema,
  updateProfileZodSchema,
  userLoginZodSchema,
  userRegisterZodSchema,
} from "./auth.validation";
import { User } from "@modules/user/user.model";
import { multerUpload } from "@config/multer.config";
import { checkAuth } from "@middlewares/checkAuth";
import { UserRoles } from "@modules/user/user.interface";

const router = Router();

router.get("/me", checkAuth(...Object.values(UserRoles)), AuthController.getMe);

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

router.post(
  "/login",
  validateRequest(userLoginZodSchema),
  AuthController.login
);
router.post(
  "/register",
  multerUpload.single("file"),
  validateRequest(userRegisterZodSchema),
  AuthController.register
);

router.patch(
  "/change-password",
  checkAuth(...Object.values(UserRoles)),
  validateRequest(changePasswordZodSchema),
  AuthController.changePassword
);

router.patch(
  "/update-profile",
  checkAuth(...Object.values(UserRoles)),
  validateRequest(updateProfileZodSchema),
  AuthController.updateProfile
);

router.delete("", async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All users deleted" });
});

export const AuthRoutes = router;
