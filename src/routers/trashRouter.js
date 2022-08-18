import { Router } from 'express';
import { param, query } from 'express-validator';
import trash from '../controllers/trashController';
import validate from '../middlewares/param.validate';

const router = Router();

router.post(
  '/:id',
  param('id').exists(),
  query('lat').exists(),
  query('lon').exists(),
  query('district').exists(),
  validate,
  trash.uploadTrash
);

export default router;
