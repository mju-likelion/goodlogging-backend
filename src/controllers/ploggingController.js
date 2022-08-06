import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging, User } from '../../models';
import asyncWrapper from '../errors/wrapper';
import add from 'date-fns/add';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { nextDay } from 'date-fns';

const newPlogging = async (req, res) => {
  const { user } = req;
  const plogging = Plogging.create({
    owner: user.username,
    duration: 0,
  });

  return res.json({
    owner: user.username,
    duratiion: 0,
  });
};

const forUpdate = async (req, res, next) => {
  const update = await Plogging.update(
    { duration: 0 },
    { where: { id: req.params } }
  );
  next();
};
const endPlogging = async (req, res) => {
  console.log(req.params);
  console.log(parseInt(req.params, 10));

  const startTime = await Plogging.findAll({
    where: {
      id: parseInt(req.params),
    },
  });

  /* const durationTime = differenceInSeconds(
    startTime.updatedAt,
    startTime.createdAt
  );*/
  console.log(startTime);
  //console.log(startTime.createdAt, startTime.updatedAt);
  // console.log(durationTime);

  const end = Plogging.update(
    { duration: durationTime },
    { where: { id: req.params } }
  );
  return res.json({
    duration: startTime.duration,
  });
};

export default {
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
  forUpdate: asyncWrapper(forUpdate),
};
