import { Challenge } from '../../models';
import asyncWrapper from '../errors/wrapper';
import upload from '../functions/uploadImage';

const getChallenge = async (req, res) => {
  const { user } = req;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
    attributes: ['done', 'goal'],
  });

  return res.json(challenge);
};

const editChallenge = (req, res) => {
  const { user } = req;
  const file = req.file;

  console.log(user);
  console.log(file);
  const uploadedfile = upload.uploadImage(file, user);
  console.log(uploadedfile);
};

export default {
  getChallenge: asyncWrapper(getChallenge),
  editChallenge: asyncWrapper(editChallenge),
};
