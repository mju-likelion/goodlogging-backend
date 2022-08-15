import { APIError } from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging } from '../../models';
import asyncWrapper from '../errors/wrapper';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Trash from '../../models/Trash';

const getPlogging = async (req, res) => {
  const { user } = req;
  const ploggings = await Plogging.findAll({
    raw: true,
    where: {
      owner: user.id,
    },
  });

  const result = [];

  for await (const plogging of ploggings) {
    let trashes = await Trash.findAll({
      raw: true,
      where: { plogging: plogging.id },
    });
    result.push({ plogging, trashes });
  }
  return res.json({ result });
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
  const { id } = req.params;
  await Plogging.update({ duration: 0 }, { where: { id } });
  next();
};

const endPlogging = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;

  const latestPlogging = await Plogging.findOne({
    where: {
      owner: user.id,
    },
    order: [['createdAt', 'DESC']],
  });

  if (!(String(latestPlogging.id) === id)) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.PLOGGING_BAD_REQUEST);
  }

  const startTime = await Plogging.findOne({
    raw: true,
    where: { id },
  });

  const durationTime = differenceInSeconds(
    startTime.updatedAt,
    startTime.createdAt
  );

  await Plogging.update({ duration: durationTime }, { where: { id } });

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
