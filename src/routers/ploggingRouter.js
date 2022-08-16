import { Router } from 'express';
import ploggingController from '../controllers/ploggingController';

const router = Router();

router.get('/', ploggingController.getPlogging);
router.post('/start', ploggingController.newPlogging);
router.post(
  '/end/:id',
  ploggingController.forUpdate,
  ploggingController.endPlogging
);

export default router;
