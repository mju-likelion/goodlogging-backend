import { NO_CONTENT } from "http-status";
import {User, Challenge} from "../../models";
import asyncWrapper from "../errors/wrapper";
import calculateLevel from "../middlewares/calculateLevel";

const userProfile = async (req, res) => {
    const { user } = req;
    const targetUser = await User.findOne({
        where: {
            username: user.username
        }
    });
    return res.json({
        profile: {
            username: targetUser.username,
            email: targetUser.email,
            address: targetUser.address
        }
    });
    // 유저가 올린 게시물들 표현은 추후 작업...
}

const userEdit = async (req, res) => {
    const {
        body: {
            level, address
        }, 
        user
    } = req;
    const targetUser = await User.findOne({
        username: user.username
    });
    await targetUser.update({
        level,
        address
    });
    const challenges = await Challenge.findAll({
        where: {
            owner: user.username
        }
    });
    for await (const challenge of challenges){
        await challenge.update({
            goal: calculateLevel(level),
            address
        });
    }
    return res.sendStatus(NO_CONTENT);
}

export default {
    userProfile: asyncWrapper(userProfile),
    userEdit: asyncWrapper(userEdit)
}