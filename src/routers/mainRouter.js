import { Router } from 'express';
import main from '../controllers/mainController';

const router = Router();

router.get('/', main.getMaininfo);

export default router;
