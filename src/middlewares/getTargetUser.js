import { User } from '../../models';
import { APIError } from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';

const isTargetUserExist = async (username) => {
  const targetUser = await User.findOne({
    where: {
      username,
    },
  });
  if (!targetUser) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.USER_NOT_FOUND);
  }
  return targetUser.dataValues;
};

export default isTargetUserExist;
