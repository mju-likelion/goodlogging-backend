import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging, User } from '../../models';
import asyncWrapper from '../errors/wrapper';
import add from 'date-fns/add';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { nextDay } from 'date-fns';
import Trash from '../../models/Trash';

const getPlogging = async (req, res) => {
  const id = parseInt(req.params.id);
  const trash = await Trash.findAll({
    raw: true,
    where: {
      plogging: id,
    },
  });
  const user = await Plogging.findOne({
    raw: true,
    where: { id },
  });
  return res.json(
    {
      owner: user[0].owner,
      duration: user[0].duration,
    },
    { trash }
  );
};
const newPlogging = async (req, res) => {
  const { user } = req;
  console.log(user.id);
  const plogging = await Plogging.create({
    owner: user.id,
    duration: 0,
  });
  return res.json({});
};
const forUpdate = async (req, res, next) => {
  const update = await Plogging.update(
    { duration: 0 },
    { where: { id: parseInt(req.params.id) } }
  );
  next();
};
const endPlogging = async (req, res) => {
  const startTime = await Plogging.findAll({
    raw: true,
    where: {
      id: parseInt(req.params.id),
    },
  });
  const durationTime = differenceInSeconds(
    startTime[0].updatedAt,
    startTime[0].createdAt
  );
  const end = Plogging.update(
    { duration: durationTime },
    { where: { id: parseInt(req.params.id) } }
  );

  return res.send('플로깅 종료!');
};

export default {
  getPlogging: asyncWrapper(getPlogging),
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
  forUpdate: asyncWrapper(forUpdate),
};
