import "@config/passport.config";
import { globalErrorHandler } from "@middlewares/globalErrorHandler";
import { notFoundHandler } from "@middlewares/not-found";
import cookieParser from 'cookie-parser';
import express from "express";
import expressSession from "express-session";
import passport from 'passport';
import router from "./routes/routes.index";
import envConfig from "@config/env.config";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: ["http://localhost:5000", "https://eventure-eight-sigma.vercel.app"]}))

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
  });
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
