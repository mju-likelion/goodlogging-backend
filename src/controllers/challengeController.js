import { Challenge } from '../../models';
import asyncWrapper from '../errors/wrapper';
import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';

const getChallenge = async (req, res) => {
  const day = ({
    query: { year, month, date },
  } = req);
  console.log(day);
  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
  });

  const createdAt = JSON.stringify(challenge.createdAt);

  if (!createdAt.includes(`${year}-${month}`)) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.CHALLENGE_NOT_EXISTS);
  } else {
    return res.json(challenge);
  }
};

const editChallenge = (req, res) => {};

export default {
  getChallenge: asyncWrapper(getChallenge),
  editChallenge: asyncWrapper(editChallenge),
};
