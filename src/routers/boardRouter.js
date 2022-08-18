import { Router } from 'express';
import { param, body } from 'express-validator';
import validate from '../middlewares/param.validate';
import board from '../controllers/boardController';
import multer from 'multer';
import multerConfig from '../../config/multer.config';

const router = Router();

router.put(
  '/:id/memo',
  param('id').exists(),
  body('memo').exists(),
  validate,
  board.editBoardMemo
);

router.post(
  '/:id/image',
  param('id').exists(),
  multer(multerConfig).single('image'),
  validate,
  board.editBoardImage
);

export default router;
