import challenge from '../controllers/challengeController';

import { Router } from 'express';
const router = Router();

router.get('/', challenge.getChallenge);
router.put('/', challenge.editChallenge);

export default router;
