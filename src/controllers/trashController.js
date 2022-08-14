import httpStatus from 'http-status';
import { Trash } from '../../models';
import Plogging from '../../models/Plogging';
import { APIError } from '../errors/apierror';
import errorCodes from '../errors/error';
import asyncWrapper from '../errors/wrapper';

const uploadTrash = async (req, res) => {
  const {
    params: { id },
    query: { lon, lat, district },
    user,
  } = req;

  const plogging = await Plogging.findOne({
    where: {
      id,
      owner: user.id,
    },
  });

  if (!plogging) {
    throw new APIError(httpStatus.BAD_REQUEST, errorCodes.PLOGGING_NOT_EXISTS);
  }

  const trash = await Trash.create({
    district,
    latitude: lat,
    longitude: lon,
    plogging: id,
  });

  return res.json(trash);
};

export default {
  uploadTrash: asyncWrapper(uploadTrash),
};
