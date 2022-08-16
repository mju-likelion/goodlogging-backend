import httpStatus from 'http-status';
import { Trash } from '../../models';
import User from '../../models/User';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';

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
      }
    )
  ).forEach((trash) =>
    trashes.push({
      latitude: trash.latitude,
      longitude: trash.longitude,
    })
  );

  if (sorted === 'time') {
    (
      await User.findAll({
        where: {
          address: user.address,
        },
        order: [['plogging', 'desc']],
      })
    ).forEach((user) => users.push(user.username));
  } else if (sorted === 'count') {
    (
      await User.findAll({
        where: {
          address: user.address,
        },
        order: [['trash', 'desc']],
      })
    ).forEach((user) => users.push(user.username));
  } else {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.SORT_BAD_REQUEST);
  }

  return res.json({ trashes, users });
};

export default {
  mainFeed: asyncWrapper(mainFeed),
};
