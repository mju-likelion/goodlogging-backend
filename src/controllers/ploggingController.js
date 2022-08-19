import { APIError } from '../errors/apierror';
import httpStatus from 'http-status';
import errorCodes from '../errors/error';
import { Plogging } from '../../models';
import asyncWrapper from '../errors/wrapper';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Trash from '../../models/Trash';
import Challenge from '../../models/Challenge';
import User from '../../models/User';
import giveBadge from '../functions/giveBadge';
import Board from '../../models/Board';

const newPlogging = async (req, res) => {
  const { user } = req;

  const latestPlogging = await Plogging.findOne({
    raw: true,
    where: {
      owner: user.id,
    },
    order: [['createdAt', 'desc']],
  });

  // 한 플로깅이 없을 경우 (처음으로 플로깅할 경우) 뱃지 부여
  if (!latestPlogging) {
    await giveBadge('플로깅의 시작', user);
  }

  if (latestPlogging && !latestPlogging.end) {
    // latestPlogging의 모든 쓰레기 삭제
    await Trash.destroy({
      where: {
        plogging: latestPlogging.id,
      },
    });
    // latestPlogging 삭제
    await Plogging.destroy({
      where: {
        id: latestPlogging.id,
      },
    });
  }

  const plogging = await Plogging.create({
    owner: user.id,
    duration: 0,
  });

  const createdAt = JSON.stringify(plogging.createdAt);

  const month = createdAt.substring(6, 8);
  const date = createdAt.substring(9, 11);

  await Plogging.update(
    { title: `${month}월 ${date}일 플로깅` },
    { where: { id: plogging.id } }
  );

  const result = await Plogging.findOne({
    raw: true,
    where: { duration: 0, owner: user.id, end: 0 },
    attributes: ['title', 'id', 'owner', 'duration'],
  });

  return res.json({ result });
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
    order: [['createdAt', 'desc']],
  });

  if (
    latestPlogging == null ||
    !(String(latestPlogging.id) === id) ||
    latestPlogging.end
  ) {
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

  await Plogging.update(
    { duration: durationTime, end: true },
    { where: { id } }
  );

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

  const challenge = await Challenge.findOne({
    raw: true,
    where: {
      owner: user.id,
    },
  });

  if (challenge.done >= challenge.goal) {
    await giveBadge('챌린저', user);
  }

  await Challenge.update(
    {
      done: challenge.done + durationTime,
    },
    {
      where: {
        id: challenge.id,
      },
    }
  );

  if (user.plogging + durationTime >= 180000) {
    await giveBadge('빠샤~ 빠샤~', user);
  }

  await User.update(
    {
      plogging: user.plogging + durationTime,
      trash: user.trash + trash.count,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  // 플로깅을 끝내면 게시물이 자동으로 생성
  const board = await Board.create({
    owner: user.id,
    plogging: id,
  });

  return res.json({ result, trash: trash.count, board: board.id });
};

export default {
  newPlogging: asyncWrapper(newPlogging),
  endPlogging: asyncWrapper(endPlogging),
  forUpdate: asyncWrapper(forUpdate),
};
