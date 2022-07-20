import {User} from "../../models";

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