import dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk';

const storage = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export default storage;
