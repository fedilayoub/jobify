import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";

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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
