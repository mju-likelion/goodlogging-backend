import { Router } from 'express';
import badge from '../controllers/badgeController';

const router = Router();

router.get('/', badge.badgeHome);

export default router;
