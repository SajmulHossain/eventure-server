import express from "express";
import router from "./routes/routes.index";

const app = express();

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.json({
    message: "Server is running!",
  });
});

export default app;
