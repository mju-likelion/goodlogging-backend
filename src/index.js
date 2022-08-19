import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
import { sequelize } from '../models';
import globalRouter from './routers/index';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://develop--goodlogging.netlify.app',
    ],
  })
);

app.use(globalRouter);
// test
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ 데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

const handleListen = () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
