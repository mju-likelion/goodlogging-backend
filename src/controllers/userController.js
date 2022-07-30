import httpStatus, { NO_CONTENT } from "http-status";
import { Challenge } from "../../models";
import { APIError } from "../errors/apierror";
import errorCodes from "../errors/error";
import asyncWrapper from "../errors/wrapper";
import calculateLevel from "../middlewares/calculateLevel";
import isTargetUserExist from "../middlewares/getTargetUser";

const userProfile = async (req, res) => {
    const { username } = req.body;
    const targetUser = isTargetUserExist(username);
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
        param: {
            username
        },
        user
    } = req;
    
    const targetUser = isTargetUserExist(username);
    
    if(user.username !== targetUser.username){
        throw new APIError(httpStatus.UNAUTHORIZED, errorCodes.UNAUTHORIZED);
    }

    await targetUser.update({
        level,
        address
    });

    const challenges = await Challenge.findAll({
        where: {
            owner: username
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