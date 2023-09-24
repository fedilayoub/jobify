import { Router } from "express";
const router = Router();
import {
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkTestUser, validateIdParam, validateJobInput, editJob)
  .delete(checkTestUser, validateIdParam, deleteJob);

export default router;
