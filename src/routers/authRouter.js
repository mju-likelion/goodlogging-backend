import { Router } from "express";
import { body } from "express-validator";
import validate from "../middlewares/param.validate";
import user from "../controllers/userController";
import auth from "../controllers/authController";

const router = Router();

router.post("/register", body('username').exists(), body('email').exists(), body('password').exists(), body('level').exists(), body('address').exists(), validate, auth.register);
router.post("/login", body('email').exists(), body('password').exists(), validate, auth.login);

export default router;