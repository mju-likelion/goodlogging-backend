import { Router } from "express";
import { body } from "express-validator";
import validate from "../middlewares/param.validate";
import user from "../controllers/userController";

const router = Router();

router.post("/register", body('username').exists(), body('email').exists(), body('password').exists(), body('level').exists(), body('address').exists(), validate, user.register);
router.post("/login", body('email').exists(), body('password').exists(), validate, user.login);

export default router;