import { validationResult } from 'express-validator/src/validation-result';
import httpStatus from 'http-status';

const validate = (req, res, next) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    res.status(httpStatus.BAD_REQUEST).send(results);
  }

  next();
};
//유효성검증
export default validate;
