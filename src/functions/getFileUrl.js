import storage from '../../config/s3.config';
import File from '../../models/File';
import { Op } from 'sequelize';

const getFileUrl = async (id, type) => {
  const file = await File.findOne({
    where: {
      fileName: {
        [Op.like]: `%${type}/${id}%`,
      },
    },
  });

  if (!file) {
    // 파일이 없으면 기본 사진 제공되도록 해야 함
    return 'DEFAULT_IMAGE_URL';
  } else {
    // 조회할 때 마다 프리사인 url 새로 생성
    const url = storage.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.fileName,
      Expires: 604800,
    });
    return url;
  }
};

export default getFileUrl;
