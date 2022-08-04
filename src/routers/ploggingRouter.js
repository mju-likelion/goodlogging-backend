import validate from '../middlewares/param.validate';
import { Router } from 'express';
import { query } from 'express-validator';
import ploggingController from '../controllers/ploggingController';
import time from '../middlewares/time';

const router = Router();

router.get('/', validate, (req, res) => {
  console.log('asdasdasd');
});
router.post('/start', time.getTime, ploggingController.newPlogging);
router.post('/end', time.getDurationTime, ploggingController.endPlogging);

export default router;
