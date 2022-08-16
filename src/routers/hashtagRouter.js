import { Router } from 'express';
import hashtag from '../controllers/hashtagController';

const router = Router();

router.get('/', hashtag.hashtagRoom);

export default router;
