import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

dotenv.config();
const app = express();

const jobs = [
  {
    id: nanoid(),
    company: "Google",
    position: "Software Engineer",
  },
  {
    id: nanoid(),
    company: "Facebook",
    position: "Software Engineer",
  },
];

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

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).send(jobs);
});

// CREATE A JOB
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).send("Company and Position are required");
  }
  const job = { id: nanoid(), company, position };
  jobs.push(job);
  res.status(201).send({ job });
});



const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});