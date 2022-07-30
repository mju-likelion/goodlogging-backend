import { Router } from "express";
import { body, param } from "express-validator";
import validate from "../middlewares/param.validate";
import user from "../controllers/userController";

const router = Router();

router.get("/:username", param('username').exists(), validate, user.userProfile);
router.put("/:username", param('username').exists(), body('level').exists(), body('address').exists(), validate, user.userEdit);

export default router;