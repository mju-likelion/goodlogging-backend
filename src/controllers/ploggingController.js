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
  console.log(id);
  const trash = await Trash.findAll({
    raw: true,
    attributes: ['latitude', 'longitude'],
    where: {
      plogging: id,
    },
  });
  console.log(trash);
  const user = await Plogging.findOne({
    raw: true,
    where: { id },
  });
  console.log(user);
  console.log(user.owner);
  console.log(user.duration);
  return res.json(
    {
      owner: user.owner,
      duration: user.duration,
    },
    { trash: [trash.latitude, trash.longitude] }
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
  const id = req.params.id;
  const startTime = await Plogging.findOne({
    raw: true,
    where: {
      id: parseInt(id),
    },
  });
  const durationTime = differenceInSeconds(
    startTime.updatedAt,
    startTime.createdAt
  );
  const end = Plogging.update(
    { duration: durationTime },
    { where: { id: parseInt(req.params.id) } }
  );

  return res.json({ startTime });
};

export default {
  getPlogging: asyncWrapper(getPlogging),
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
  forUpdate: asyncWrapper(forUpdate),
};
