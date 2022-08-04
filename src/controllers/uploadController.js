import httpStatus from 'http-status';
import { File } from '../../models';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';
import storage from '../../config/s3.config';

const uploadFileToS3 = async (req, res) => {
  const fileData = req.file;
  const file = await getFileId(req, fileData);
  res.json(file);
};

const getFileId = async (req, fileData) => {
  try {
    const { user } = req;
    const fileContent = req.file?.buffer;
    if (!fileContent) {
      throw new APIError(httpStatus.BAD_REQUEST, errorCodes.FILE_NOT_PROVIDED);
    }
    const file = await File.create({
      owner: user.username,
      fileName: fileData.originalname,
    });
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${file.id}.${fileData.mimetype.split('/')[1]}`,
      Body: fileContent,
    };

    await storage.upload(params).promise();

    const url = storage.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${file.id}.${fileData.mimetype.split('/')[1]}`,
      Expires: 60 * 5,
    });

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
  uploadFileToS3: asyncWrapper(uploadFileToS3),
};
