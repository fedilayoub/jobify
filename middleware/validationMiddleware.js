import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((err) => err.msg);
          throw new BadRequestError(errorMessages);
        }
        next();
      }]
}

export const validateJobInput = withValidationErrors(
    [
      body("company").notEmpty().withMessage("Company is required"),
      body("position").notEmpty().withMessage("Position is required"),
      body("jobLocation").notEmpty().withMessage("Job location is required"),
      body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid job status"),
      body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
    ]
)

export const validateIdParam = withValidationErrors(
    [
      param("id").isMongoId().withMessage("Invalid job id"),
    ]
)