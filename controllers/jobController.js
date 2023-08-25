import Job from '../models/JobModel.js';
import { nanoid } from "nanoid";
let jobs = [
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

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).send(jobs);
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  
  res.status(201).send({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).send(`No job with id ${id} was found`);
  }
  res.status(200).send({ job });
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).send("Company and Position are required");
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).send(`No job with id ${id} was found`);
  }
  job.company = company;
  job.position = position;
  res.status(200).send({ job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).send(`No job with id ${id} was found`);
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).send({ msg: `Job with id ${id} was deleted` });
};
