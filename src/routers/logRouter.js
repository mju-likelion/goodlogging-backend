import { Router } from 'express';
import log from '../controllers/logController';

const router = Router();

router.get('/', log.allLog);

export default router;
