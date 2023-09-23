import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "650ec77b827952c2c2f6f35e";
    req.user = { userId, role, testUser };
    next();
  } catch {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized");
    }
    next();
  };
};

export const checkTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Test user cannot perform this action");
  }
  next();
};
