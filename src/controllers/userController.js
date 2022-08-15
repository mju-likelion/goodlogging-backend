import { NO_CONTENT } from 'http-status';
import { Challenge, User } from '../../models';
import asyncWrapper from '../errors/wrapper';
import calculateLevel from '../middlewares/calculateLevel';

const userProfile = async (req, res) => {
  const { user } = req;
  return res.json({
    level: user.level,
    address: user.address,
    plogging: user.plogging,
    trash: user.trash,
  });
};

const userEdit = async (req, res) => {
  const {
    body: { level, address },
    user,
  } = req;

  await User.update(
    {
      level,
      address,
    },
    {
      where: {
        username: user.username,
      },
    }
  );

  await Challenge.update(
    {
      goal: calculateLevel(level),
      address,
    },
    {
      where: {
        owner: user.id,
      },
    }
  );

  return res.sendStatus(NO_CONTENT);
};

export default {
  userProfile: asyncWrapper(userProfile),
  userEdit: asyncWrapper(userEdit),
};
