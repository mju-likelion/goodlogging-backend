import httpStatus from 'http-status';
import Board from '../../models/Board';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';
import giveBadge from '../functions/giveBadge';
import { uploadFunction } from '../functions/uploadImage';

const editBoardMemo = async (req, res) => {
  const {
    body: { memo },
    params: { id },
    user,
  } = req;

  const board = await Board.findOne({
    where: {
      id,
      owner: user.id,
    },
  });

  if (!board) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.BOARD_BAD_REQUEST);
  }

  await Board.update(
    {
      memo,
    },
    {
      where: {
        id,
      },
    }
  );

  await giveBadge('같이 플로깅', user);
  return res.send(httpStatus.NO_CONTENT);
};

const editBoardImage = async (req, res) => {
  const {
    params: { id },
    file,
    user,
  } = req;

  const isBoardCorrect = await Board.findOne({
    where: {
      id,
      owner: user.id,
    },
  });

  if (!isBoardCorrect) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.BOARD_BAD_REQUEST);
  }

  const result = await uploadFunction(file, user, id, 'board');
  return res.json(result);
};

export default {
  editBoardMemo: asyncWrapper(editBoardMemo),
  editBoardImage: asyncWrapper(editBoardImage),
};
