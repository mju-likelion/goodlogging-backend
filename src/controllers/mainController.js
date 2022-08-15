import { Plogging } from '../../models';
import asyncWrapper from '../errors/wrapper';
import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';

const getMaininfo = async (req, res) => {
  const { user } = req;
  let Volume = 0;
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
      Volume += myVolume.duration;
      const createdAt = JSON.stringify(myVolumes[0].createdAt);
      const date = createdAt.substring(1, 11);
      everyRecords.push({ date: date, duration: myVolumes[0].duration });
    } else {
      res.json({ error: '플로깅이 없습니다.' });
    }
  }

  return res.json({ duration: Volume, everyRecords });
};

export default {
  getMaininfo: asyncWrapper(getMaininfo),
};
