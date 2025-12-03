import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {scope: ["profile", "email"]})(req, res, next);
})

router.get("/google/callback", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
        failureRedirect: "/auth/failure"
    })(req, res, next);
});



export const AuthRoutes = router;