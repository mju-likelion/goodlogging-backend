import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/param.validate';
import user from '../controllers/userController';

const router = Router();

router.get('/', user.userProfile);

router.put(
  '/',
  body('level').exists(),
  body('address').exists(),
  validate,
  user.userEdit
);

export default router;
