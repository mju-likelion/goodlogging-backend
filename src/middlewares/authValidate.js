import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { User } from '../../models';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';

const authMiddleware = async (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        id: req.decoded.id,
      },
    });
    req.user = {
      id: req.decoded.id,
      username: user.username,
      email: user.email,
      level: user.level,
      address: user.address,
      plogging: user.plogging,
      trash: user.trash,
    };
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new APIError(httpStatus.UNAUTHORIZED, errorCodes.AUTH_EXPIRED);
    }
    throw new APIError(httpStatus.UNAUTHORIZED, errorCodes.UNVALID_AUTH);
  }
};

const auth = asyncWrapper(authMiddleware);

export default auth;
