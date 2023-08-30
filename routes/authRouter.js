import Router from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
const router = Router();


router.post("/login",login);
router.post("/register",validateRegisterInput,register);


export default router;