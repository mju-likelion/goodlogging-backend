import httpStatus from 'http-status';
import Board from '../../models/Board';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';

export const editBoardMemo = async (req, res) => {
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

  return res.send(httpStatus.NO_CONTENT);
};

export default {
  editBoardMemo: asyncWrapper(editBoardMemo),
};
