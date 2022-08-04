import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer.config';
import validate from '../middlewares/param.validate';
import upload from '../controllers/uploadController';

const router = Router();

router.post(
  '/',
  multer(multerConfig).single('image'),
  validate,
  upload.uploadFileToS3
);

export default router;
