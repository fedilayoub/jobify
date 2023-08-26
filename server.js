import 'express-async-errors'
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

dotenv.config();
const app = express();

//HTTP request logger middleware for node.js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Setup express middleware to accept json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.body);
});

// Job router
app.use("/api/v1/jobs", jobRouter);
const port = process.env.PORT || 5100;

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
  });
} catch {
  console.log(err);
  process.exit(1)
}
