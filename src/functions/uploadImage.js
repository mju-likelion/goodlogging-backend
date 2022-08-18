import httpStatus from 'http-status';
import File from '../../models/File';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';
import storage from '../../config/s3.config';
import { Op } from 'sequelize';

export const uploadFunction = async (file, user, id, type) => {
  const result = await uploadToS3(user, file, id, type);
  return result; // 결과물 표현
};

const uploadToS3 = async (user, originFile, id, type) => {
  try {
    const fileContent = originFile?.buffer; // 버퍼된 파일 데이터

    if (!fileContent) {
      throw new APIError(httpStatus.BAD_REQUEST, errorCodes.FILE_NOT_PROVIDED);
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // s3 버킷
      Key: `${type}/${id}.${originFile.mimetype.split('/')[1]}`, // 파일 이름
      Body: fileContent, // 파일 내용
    };

    // 기존 파일이 없으면 --> db 및 s3에 파일 업로드
    // 기존 파일이 있으면 --> db 및 s3에 있는 파일 삭제 후 파일 업로드

    const fileCheck = await File.findOne({
      where: {
        fileName: {
          [Op.like]: `%${type}/${id}%`,
        },
      },
    });
    if (fileCheck) {
      await File.destroy({
        where: {
          id: fileCheck.id,
        },
      });
      await storage
        .deleteObject({ Bucket: params.Bucket, Key: params.Key })
        .promise();
    }

    const file = await File.create({
      owner: user.id,
      fileName: `${type}/${id}.${originFile.mimetype.split('/')[1]}`,
    });

    // s3에 파일 업로드
    await storage.upload(params).promise();

    return file;
  } catch (error) {
    throw error;
  }
};

export default {
  uploadFunction: asyncWrapper(uploadFunction),
};
