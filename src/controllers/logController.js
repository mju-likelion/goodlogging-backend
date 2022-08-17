import asyncWrapper from '../errors/wrapper';
import Plogging from '../../models/Plogging';

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

export default {
  allLog: asyncWrapper(allLog),
};
