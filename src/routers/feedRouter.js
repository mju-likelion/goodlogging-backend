import feed from '../controllers/feedController';
import { query } from 'express-validator';
import validate from '../middlewares/param.validate';

const { Router } = require('express');
const router = Router();

router.get('/', query('sorted').exists(), validate, feed.mainFeed);

export default router;
