import { Router } from 'express';
import authRouter from './authRouter';
import challengeRouter from './challengeRouter';
import userRouter from './userRouter';
import uploadRouter from './uploadRouter';
import authValidate from '../middlewares/authValidate';
import validate from '../middlewares/param.validate';

const router = Router();

router.use('/auth', authRouter);
router.use('/challenge', authValidate, validate, challengeRouter);
router.use('/user', authValidate, validate, userRouter);
router.use('/upload', authValidate, uploadRouter);

export default router;
