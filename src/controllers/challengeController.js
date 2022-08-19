import { Challenge } from '../../models';
import asyncWrapper from '../errors/wrapper';
import { uploadFunction } from '../functions/uploadImage';

const getChallenge = async (req, res) => {
  const { user } = req;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
    attributes: ['done', 'goal', 'id'],
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
  console.log('thisis file :' + file);
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
  editChallengeImage: asyncWrapper(editChallengeImage),
};
