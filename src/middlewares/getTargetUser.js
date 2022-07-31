import { User } from '../../models';

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
