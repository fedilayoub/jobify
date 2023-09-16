import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();

//HTTP request logger middleware for node.js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Setup express middleware to accept json
app.use(express.json());

//Cookie parser middleware
app.use(cookieParser());

// Job router
app.use("/api/v1/jobs",authenticateUser, jobRouter);

// Auth router
app.use("/api/v1/auth", authRouter);

// User router
 app.use("/api/v1/users",authenticateUser, userRouter);

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
  process.exit(1);
}
