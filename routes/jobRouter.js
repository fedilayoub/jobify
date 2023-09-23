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
import { validateJobInput,validateIdParam } from "../middleware/validationMiddleware.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route('/stats',showStats)
router
  .route("/:id")
  .get(validateIdParam,getJob)
  .patch(validateIdParam,validateJobInput, editJob)
  .delete(validateIdParam,deleteJob);

export default router;
