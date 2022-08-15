import { Router } from 'express';
import authRouter from './authRouter';
import challengeRouter from './challengeRouter';
import userRouter from './userRouter';
import uploadRouter from './uploadRouter';
import authValidate from '../middlewares/authValidate';
import ploggingRouter from '../routers/ploggingRouter';
import trashRouter from '../routers/trashRouter';
import badgeRouter from '../routers/badgeRouter';
import validate from '../middlewares/param.validate';

const router = Router();

router.use('/auth', authRouter);
router.use('/challenge', authValidate, validate, challengeRouter);
router.use('/user', authValidate, validate, userRouter);
router.use('/plogging', authValidate, ploggingRouter);
router.use('/trash', authValidate, trashRouter);
router.use('/badge', authValidate, badgeRouter);
router.use('/upload', authValidate, uploadRouter);

router.get('/', (req, res) => {
  return res.send('hello world!');
});

router.get('/test', (req, res) => {
  return res.send('깃허브 변경 내역 저장 후 배포되었는지 마지막 테스트');
});

export default router;
