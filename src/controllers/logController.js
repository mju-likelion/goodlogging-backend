import asyncWrapper from '../errors/wrapper';
import Plogging from '../../models/Plogging';
import Trash from '../../models/Trash';
import httpStatus from 'http-status';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';

const allLog = async (req, res) => {
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

const editLog = async (req, res) => {
  const {
    body: { title },
    params: { id },
    user,
  } = req;

  const plogging = await Plogging.findOne({
    where: {
      id,
      owner: user.id,
    },
  });

  if (!plogging) {
    throw new APIError(
      httpStatus.UNAUTHORIZED,
      errorCodes.PLOGGING_BAD_REQUEST
    );
  }

  await Plogging.update(
    {
      title,
    },
    {
      where: { id, owner: user.id },
    }
  );

  return res.send(httpStatus.NO_CONTENT);
};

export default {
  allLog: asyncWrapper(allLog),
  editLog: asyncWrapper(editLog),
};
