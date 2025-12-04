import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";
import { validateRequest } from "@middlewares/validateRequest";
import { userLoginZodSchema, userRegisterZodSchema } from "./auth.validation";
import { User } from "@modules/user/user.model";
import { multerUpload } from "@config/multer.config";

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
  multerUpload.single("file"),
  validateRequest(userRegisterZodSchema),
  AuthController.register
);

router.delete("", async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ message: "All users deleted" });
})

export const AuthRoutes = router;