import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const handleListen = () => {
    console.log(`Server listening at: http:localhost:${PORT}`);
}

app.listen(PORT, handleListen);