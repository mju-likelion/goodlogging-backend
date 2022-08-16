import { Plogging } from '../../models';
import asyncWrapper from '../errors/wrapper';
import Challenge from '../../models/Challenge';

const getMaininfo = async (req, res) => {
  const { user } = req;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
    attributes: ['done', 'goal'],
  });

  const myVolumes = await Plogging.findAll({
    raw: true,
    attributes: ['duration', 'createdAt'],
    where: {
      owner: user.id,
    },
  });

  const everyRecords = [];

  for await (const myVolume of myVolumes) {
    const createdAt = JSON.stringify(myVolume.createdAt);
    const date = createdAt.substring(1, 11);
    everyRecords.push({ date: date, duration: myVolume.duration });
  }

  return res.json({
    goal: challenge.goal,
    duration: challenge.done,
    everyRecords,
  });
};

export default {
  getMaininfo: asyncWrapper(getMaininfo),
};
