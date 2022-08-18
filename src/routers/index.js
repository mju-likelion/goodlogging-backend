import { Router } from 'express';
import authRouter from './authRouter';
import challengeRouter from './challengeRouter';
import userRouter from './userRouter';
import uploadRouter from './uploadRouter';
import authValidate from '../middlewares/authValidate';
import ploggingRouter from '../routers/ploggingRouter';
import logRouter from '../routers/logRouter';
import boardRouter from '../routers/boardRouter';
import trashRouter from '../routers/trashRouter';
import badgeRouter from '../routers/badgeRouter';
import feedRouter from '../routers/feedRouter';
import validate from '../middlewares/param.validate';
import mainRouter from '../routers/mainRouter';
import hashtagRouter from '../routers/hashtagRouter';
import convertChallenge from '../middlewares/checkChallenge';

const router = Router();

router.use('/auth', authRouter);
router.use('/challenge', authValidate, validate, challengeRouter);
router.use('/user', authValidate, validate, userRouter);
router.use('/log', authValidate, logRouter);
router.use('/plogging', authValidate, ploggingRouter);
router.use('/board', authValidate, boardRouter);
router.use('/trash', authValidate, trashRouter);
router.use('/badge', authValidate, badgeRouter);
router.use('/feed', authValidate, feedRouter);
router.use('/upload', authValidate, uploadRouter);
router.use('/main', authValidate, convertChallenge, mainRouter);
router.use('/hashtag', authValidate, hashtagRouter);

export default router;
