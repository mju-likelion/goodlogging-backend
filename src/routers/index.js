import { Router } from 'express';
import authRouter from './authRouter';
import challengeRouter from './challengeRouter';
import userRouter from './userRouter';
import uploadRouter from './uploadRouter';
import authValidate from '../middlewares/authValidate';
import ploggingRouter from '../routers/ploggingRouter';
import trashRouter from '../routers/trashRouter';
import badgeRouter from '../routers/badgeRouter';
import feedRouter from '../routers/feedRouter';
import validate from '../middlewares/param.validate';
import mainRouter from '../routers/mainRouter';
import hashtagRouter from '../routers/hashtagRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/challenge', authValidate, validate, challengeRouter);
router.use('/user', authValidate, validate, userRouter);
router.use('/plogging', authValidate, ploggingRouter);
router.use('/trash', authValidate, trashRouter);
router.use('/badge', authValidate, badgeRouter);
router.use('/feed', authValidate, feedRouter);
router.use('/upload', authValidate, uploadRouter);
router.use('/main', authValidate, mainRouter);
router.use('/hashtag', authValidate, hashtagRouter);

router.get('/', (req, res) => {
  return res.send('hello world!');
});

router.get('/test', (req, res) => {
  return res.send('깃허브 변경 내역 저장 후 배포되었는지 마지막 테스트');
});

export default router;
