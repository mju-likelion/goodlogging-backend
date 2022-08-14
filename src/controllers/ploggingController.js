import APIError from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging, User } from '../../models';
import asyncWrapper from '../errors/wrapper';
import add from 'date-fns/add';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { nextDay } from 'date-fns';
import Trash from '../../models/Trash';
import { pl } from 'date-fns/locale';

const getPlogging = async (req, res) => {
  const id = parseInt(req.params.id);
  const trash = await Trash.findAll({
    raw: true,
    attributes: ['latitude', 'longitude'],
    where: {
      plogging: id,
    },
  });

  const user = await Plogging.findOne({
    raw: true,
    where: { id },
  });
  return res.json({
    owner: user.owner,
    duration: user.duration,
    trash,
  });
};

const newPlogging = async (req, res) => {
  const { user } = req;

  const plogging = await Plogging.create({
    owner: user.id,
    duration: 0,
  });

  return res.json({
    id: plogging.id,
    owner: plogging.owner,
    duration: plogging.duration,
  });
};
const forUpdate = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const update = await Plogging.update({ duration: 0 }, { where: { id } });
  next();
};
const endPlogging = async (req, res) => {
  const id = parseInt(req.params.id);
  const startTime = await Plogging.findOne({
    raw: true,
    where: { id },
  });
  console.log(startTime);
  const durationTime = differenceInSeconds(
    startTime.updatedAt,
    startTime.createdAt
  );
  const end = Plogging.update({ duration: durationTime }, { where: { id } });

  const trash = await Trash.findAndCountAll({
    raw: true,
    where: {
      plogging: id,
    },
  });
  const result = await Plogging.findOne({
    raw: true,
    attributes: ['owner', 'duration'],
    where: { id },
  });
  console.log(result);
  return res.json({
    owner: result.owner,
    duration: result.duration,
    trash: trash.count,
  });
};

export default {
  getPlogging: asyncWrapper(getPlogging),
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
  forUpdate: asyncWrapper(forUpdate),
};
