import { Router } from 'express';
import { body, param } from 'express-validator';
import log from '../controllers/logController';
import validate from '../middlewares/param.validate';

const router = Router();

router.get('/', log.allLog);
router.put(
  '/:id',
  param('id').exists(),
  body('title').exists(),
  validate,
  log.editLog
);

export default router;
