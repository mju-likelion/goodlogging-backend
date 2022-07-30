import httpStatus, { NO_CONTENT } from "http-status";
import {User, Challenge} from "../../models";
import jwt from "jsonwebtoken";
import { passwordHash, passwordCompare } from "../middlewares/password";
import { APIError } from "../errors/apierror";
import errorCodes from "../errors/error";
import asyncWrapper from "../errors/wrapper";
import calculateLevel from "../middlewares/calculateLevel";

const register = async (req, res) => {
    const {username, email, password, level, address} = req.body;
    const existEmail = await User.findOne({
        where: {
            email
        }
    });
    const existUsername = await User.findOne({
        where: {
            username
        }
    });
    if(existEmail || existUsername){
        throw new APIError(httpStatus.BAD_REQUEST, errorCodes.USER_ALREADY_EXISTS);
    }
    const user = await User.create({
        username,
        email,
        password: await passwordHash(password),
        level,
        address
    });
    const challenge = await Challenge.create({
        goal: calculateLevel(level),
        owner: username
    });
    return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
        address: user.address
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const exist = await User.findOne({
        where: {
            email
        }
    });
    if(!exist){
        throw new APIError(httpStatus.BAD_REQUEST, errorCodes.EMAIL_NOT_EXISTS)
    }
    const passwordCorrect = passwordCompare(password, exist.password);
    if(!passwordCorrect){
        throw new APIError(httpStatus.BAD_REQUEST, errorCodes.PASSWORD_NOT_MATCH)
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
    register: asyncWrapper(register),
    login: asyncWrapper(login),
    userProfile: asyncWrapper(userProfile),
    userEdit: asyncWrapper(userEdit)
}