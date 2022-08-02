import validate from '../middlewares/param.validate';
import { Router } from 'express';
import { query } from 'express-validator';
import { Router } from 'express';

const router = Router();

router.get('/', validate);
router.post('/start', validate);
router.post('/end', validate);

export default router;
