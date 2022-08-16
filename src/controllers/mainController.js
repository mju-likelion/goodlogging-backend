import { Plogging } from '../../models';
import asyncWrapper from '../errors/wrapper';
import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';

const getMaininfo = async (req, res) => {
  const { user } = req;
  const myVolumes = await Plogging.findAll({
    raw: true,
    attributes: ['duration', 'createdAt'],
    where: {
      owner: user.id,
    },
  });
  let everyRecords = [];

  for await (const myVolume of myVolumes) {
    if (myVolume.duration != null || myVolume.createdAt != null) {
      const createdAt = JSON.stringify(myVolume.createdAt);
      const date = createdAt.substring(1, 11);
      everyRecords.push({ date: date, duration: myVolume.duration });
    } else {
      throw new APIError(
        httpStatus.BAD_REQUEST,
        errorCodes.PLOGGING_NOT_EXISTS
      );
    }
  }

  return res.json({ duration: user.plogging, everyRecords });
};

export default {
  getMaininfo: asyncWrapper(getMaininfo),
};
