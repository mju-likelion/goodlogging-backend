import asyncWrapper from '../errors/wrapper';
import Plogging from '../../models/Plogging';
import Trash from '../../models/Trash';
import httpStatus from 'http-status';

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
  } = req;

  await Plogging.update(
    {
      title,
    },
    {
      where: { id },
    }
  );

  return res.send(httpStatus.NO_CONTENT);
};

export default {
  allLog: asyncWrapper(allLog),
  editLog: asyncWrapper(editLog),
};
