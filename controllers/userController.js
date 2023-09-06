import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";


export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.userId);
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
}


export const updateUser = async (req, res) => {
    const body = {...req.body}
    delete body.password
    const user = await User.findByIdAndUpdate(req.user.userId, body);
    res.status(StatusCodes.OK).json({ msg: "user updated successfully" });
}