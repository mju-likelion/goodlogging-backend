import { Router } from 'express';
import { param } from 'express-validator';
import plogging from '../controllers/ploggingController';
import validate from '../middlewares/param.validate';

const router = Router();

router.post('/start', plogging.newPlogging);
router.post(
  '/end/:id',
  param('id').exists(),
  validate,
  plogging.forUpdate,
  plogging.endPlogging
);

export default router;
