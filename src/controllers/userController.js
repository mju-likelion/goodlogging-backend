import {User} from "../../models";
import jwt from "jsonwebtoken";

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
        password
    });
    return res.json({user});
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const exist = await User.findOne({
        where: {
            email,
            password
        }
    })
    if(!exist){
        return res.json({error: "이메일 또는 비밀번호 에러입니다."});
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