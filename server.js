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
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


app.use(helmet());
app.use(mongoSanitize());

// __dirname : It will resolve to the directory of the current file
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "/client/dist")));

//HTTP request logger middleware for node.js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Setup express middleware to accept json
app.use(express.json());

//Cookie parser middleware
app.use(cookieParser());

// Job router
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// Auth router
app.use("/api/v1/auth", authRouter);

// User router
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname,"./client/dist","index.html"))
})

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
} catch (err) {
  console.log(err);
  process.exit(1);
}
