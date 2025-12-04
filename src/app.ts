import "@config/passport.config";
import { globalErrorHandler } from "@middlewares/globalErrorHandler";
import { notFoundHandler } from "@middlewares/not-found";
import cookieParser from 'cookie-parser';
import express from "express";
import expressSession from "express-session";
import passport from 'passport';
import router from "./routes/routes.index";
import envConfig from "@config/env.config";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: envConfig.express_session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.json({
    message: "Server is running!",
    env: envConfig.cloudinary_cloud_name
  });
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
