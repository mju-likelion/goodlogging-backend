import {User} from "../../models";
import jwt from "jsonwebtoken";
import { passwordHash, passwordCompare } from "../middlewares/password";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    const exist = await User.findOne({
        where: {
            email
        }
    });
    if(exist){
        return res.json({error: "이미 등록된 이메일입니다."});
    }
    const user = await User.create({
        name,
        email,
        password: await passwordHash(password)
    });
    return res.json({
        id: user.id,
        name: user.name,
        email: user.email
    });
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const exist = await User.findOne({
        where: {
            email
        }
    });
    if(!exist){
        return res.json({error: "등록되지 않은 이메일입니다."});
    }
    const passwordCorrect = passwordCompare(password, exist.password);
    if(!passwordCorrect){
        return res.json({error: "비밀번호 오류입니다."});
    }
    const token = jwt.sign(
        {
            id: exist.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "5m",
            issuer: "nodebird"
        }
    );
    return res.json({
        code: 200,
        message: "토큰 발급 완료",
        token
    });
}