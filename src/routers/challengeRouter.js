import challenge from '../controllers/challengeController';
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer.config';
import { param } from 'express-validator';

const router = Router();

router.get('/', challenge.getChallenge);
router.put(
  '/:id',
  param('id').exists(),
  multer(multerConfig).single('image'),
  challenge.editChallengeImage
);
export default router;
