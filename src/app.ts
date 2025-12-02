import { globalErrorHandler } from "@middlewares/globalErrorHandler";
import { notFoundHandler } from "@middlewares/not-found";
import express from "express";
import router from "./routes/routes.index";
import expressSession from "express-session";
import passport from 'passport';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.json({
    message: "Server is running!",
  });
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
