import { Challenge } from "../../models";
import asyncWrapper from "../errors/wrappter"

const getChallenge = async (req, res) => {
    const {user} = req;
    const challenge = await Challenge.findOne(
        {
            where: {
                owner: user.username
            }
        }
    )
    return res.json(challenge);
}

const editChallenge = (req, res) => {

}

export default{
    getChallenge: asyncWrapper(getChallenge),
    editChallenge: asyncWrapper(editChallenge)
}