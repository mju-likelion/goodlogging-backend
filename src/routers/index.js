import { Router } from "express";
import authRouter from "./authRouter";
import challengeRouter from "./challengeRouter";
import userRouter from "./userRouter";
import auth from "../middlewares/auth";
import validate from "../middlewares/param.validate";

const router = Router();

router.use("/auth", authRouter);
router.use('/challenge', auth, validate, challengeRouter);
router.use("/user", auth, validate, userRouter);

export default router;