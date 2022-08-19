import { Challenge } from '../../models';
import asyncWrapper from '../errors/wrapper';
import upload from '../functions/uploadImage';

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
/////

const editChallengeImage = async (req, res) => {
  const {
    params: { id },
    file,
    user,
  } = req;
  console.log('this is req.user: ' + req.user);
  console.log('this is user.id: ' + user.id);
  const isChallengeCorrect = await Challenge.findOne({
    where: {
      id: user.id,
    },
  });

  if (!isChallengeCorrect) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.BOARD_BAD_REQUEST);
  }

  const result = await uploadFunction(file, user, id, 'challenge');
  return res.json(result);
};

export default {
  getChallenge: asyncWrapper(getChallenge),
  editChallenge: asyncWrapper(editChallengeImage),
};
