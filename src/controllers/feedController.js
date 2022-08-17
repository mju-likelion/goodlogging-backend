import httpStatus from 'http-status';
import { Trash } from '../../models';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';
import userSort from '../functions/userSort';

const mainFeed = async (req, res) => {
  // 쓰레기 위치 표시 - 유저의 district 기준
  const {
    query: { sorted },
    user,
  } = req;

  const trashes = [];
  const users = [];

  (
    await Trash.findAll(
      { raw: true },
      {
        where: {
          district: user.address,
        },
        attributes: ['latitude', 'longitude'],
      }
    )
  ).forEach((trash) => trashes.push({ trash }));

  if (sorted === 'time') {
    await userSort(users, user, 'plogging');
  } else if (sorted === 'count') {
    await userSort(users, user, 'trash');
  } else {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.SORT_BAD_REQUEST);
  }

  return res.json({ trashes, users });
};

export default {
  mainFeed: asyncWrapper(mainFeed),
};
