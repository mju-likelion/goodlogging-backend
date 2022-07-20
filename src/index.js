import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {sequelize} from "../models";
import globalRouter from "./routers/index";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(globalRouter);

sequelize.sync({ force: false }).then(() => {
    console.log("✅ 데이터베이스 연결 성공");
}).catch((err) => {
    console.log(err);
});

const handleListen = () => {
    console.log(`Server listening at: http://localhost:${PORT}`);
}

app.listen(PORT, handleListen);