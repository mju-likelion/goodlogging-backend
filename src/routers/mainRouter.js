import { Router } from 'express';
import validate from '../middlewares/param.validate';
import main from '../controllers/mainController';

const router = Router();

router.get('/', validate, main.getMaininfo);

export default router;
