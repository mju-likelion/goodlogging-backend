import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
import { sequelize } from '../models';
import globalRouter from './routers/index';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000', // 더 필요하면 배열로 만들자
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
