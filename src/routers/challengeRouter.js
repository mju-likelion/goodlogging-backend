import challenge from '../controllers/challengeController';
import { Router } from 'express';
import { query } from 'express-validator';
import validate from '../middlewares/param.validate';

const router = Router();

router.get(
  '/',
  query('year').exists(),
  query('month').exists(),
  validate,
  challenge.getChallenge
);
router.put('/', challenge.editChallenge);

export default router;
