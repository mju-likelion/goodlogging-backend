import { Router } from 'express';
import plogging from '../controllers/ploggingController';

const router = Router();

router.get('/', plogging.getPlogging);
router.post('/start', plogging.newPlogging);
router.post('/end/:id', plogging.forUpdate, plogging.endPlogging);

export default router;
