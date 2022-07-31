import { User } from '../../models';
import asyncWrapper from '../errors/wrapper';

const userExistMiddleware = async (username) => {
  const targetUser = await User.findOne({
    where: {
      username,
    },
  });
  if (!targetUser) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.USER_NOT_FOUND);
  }
};

const isTargetUserExist = asyncWrapper(userExistMiddleware);

export default isTargetUserExist;
