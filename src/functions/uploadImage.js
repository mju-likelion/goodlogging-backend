import httpStatus from 'http-status';
import { File } from '../../models/File';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';
import storage from '../../config/s3.config';

const uploadImage = async (reqfile, user) => {
  const fileData = reqfile;
  const file = await uploadToS3(user, fileData);
  return file; // 결과물 표현
};

const uploadToS3 = async (requser, fileData) => {
  try {
    const { user } = requser;
    const fileContent = fileData?.buffer; // 버퍼된 파일 데이터
    if (!fileContent) {
      throw new APIError(httpStatus.BAD_REQUEST, errorCodes.FILE_NOT_PROVIDED);
    }
    // ⬇️ db에 파일 생성
    const file = await File.create({
      target: user.id,
      fileName: fileData.originalname,
    });
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // s3 버킷
      Key: `${file.id}.${fileData.mimetype.split('/')[1]}`, // 파일 이름?
      Body: fileContent, // 파일 내용
    };

    // s3에 파일 업로드
    await storage.upload(params).promise();

    // 프리사인 url 생성
    const url = storage.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${file.id}.${fileData.mimetype.split('/')[1]}`,
      Expires: 60 * 5,
    });

    // ⬇️ 파일 url 적용
    await File.update(
      {
        fileUrl: url,
      },
      {
        where: {
          id: file.id,
        },
      }
    );

    return file;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  uploadImage: asyncWrapper(uploadImage),
  uploadToS3: asyncWrapper(uploadToS3),
};
