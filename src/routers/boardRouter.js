import { Router } from 'express';
import { param, body } from 'express-validator';
import validate from '../middlewares/param.validate';
import board from '../controllers/boardController';

const router = Router();

router.put(
  '/:id/memo',
  param('id').exists(),
  body('memo').exists(),
  validate,
  board.editBoardMemo
);

export default router;
