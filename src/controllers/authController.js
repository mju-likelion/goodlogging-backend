import httpStatus from 'http-status';
import { User, Challenge } from '../../models';
import jwt from 'jsonwebtoken';
import { passwordHash, passwordCompare } from '../middlewares/password';
import calculateLevel from '../middlewares/calculateLevel';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';

const register = async (req, res) => {
  const { username, email, password, level, address } = req.body;
  const existEmail = await User.findOne({
    where: {
      email,
    },
  });
  const existUsername = await User.findOne({
    where: {
      username,
    },
  });
  if (existEmail || existUsername) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.USER_ALREADY_EXISTS);
  }
  const user = await User.create({
    username,
    email,
    password: await passwordHash(password),
    level,
    address,
  });
  const challenge = await Challenge.create({
    goal: calculateLevel(level),
    owner: user.id,
  });
  return res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    level: user.level,
    address: user.address,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({
    where: {
      email,
    },
  });
  if (!exist) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.EMAIL_NOT_EXISTS);
  }
  const passwordCorrect = passwordCompare(password, exist.password);
  if (!passwordCorrect) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.PASSWORD_NOT_MATCH);
  }
  const token = jwt.sign(
    {
      id: exist.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
      issuer: 'nodebird',
    }
  );
  return res.json({
    code: 200,
    message: '토큰 발급 완료',
    token,
  });
};

export default {
  register: asyncWrapper(register),
  login: asyncWrapper(login),
};
