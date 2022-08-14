import { Router } from 'express';
import { query, param } from 'express-validator';
import trash from '../controllers/trashController';
import validate from '../middlewares/param.validate';

const router = Router();

router.post(
  '/:id',
  query('lat').exists(),
  query('lon').exists(),
  query('district').exists(),
  validate,
  trash.uploadTrash
);

export default router;
