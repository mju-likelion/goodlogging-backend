import multer from 'multer';

const multerConfig = {
  storage: multer.memoryStorage(),
};

export default multerConfig;
