import { Challenge } from '../../models';
import asyncWrapper from '../errors/wrapper';

const getChallenge = async (req, res) => {
  const { user } = req;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
    attributes: ['done', 'goal'],
  });

  return res.json(challenge);
};

const editChallenge = (req, res) => {};

export default {
  getChallenge: asyncWrapper(getChallenge),
  editChallenge: asyncWrapper(editChallenge),
};
