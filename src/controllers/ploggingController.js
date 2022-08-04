import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging, User } from '../../models';
import asyncWrapper from '../errors/wrapper';
import add from 'date-fns/add';
import differenceInSeconds from 'date-fns/differenceInSeconds';

const newPlogging = async (req, res) => {
  const { user } = req;

  const plogging = Plogging.create({
    owner: user.username,
    date: req.app.locals.time,
    duration: 0,
  });
  return res.json({
    owner: user.username,
    date: req.app.locals.time,
    duratiion: 0,
  });
};

const endPlogging = async (req, res) => {
  const startTime = req.time; //DB에서 시작 시간을 찾을때 사용
  const durationTime = req.durationTime; //time 미들웨어에서 계산한 지속타임

  const end = async () => {
    await Plogging.update(
      { duration: durationTime },
      { where: { date: startTime } }
    );
  };
  return res.json({
    duration: end.duration,
  });
};

export default {
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
};
