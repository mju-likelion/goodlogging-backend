import add from 'date-fns/add';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { check } from 'express-validator';
import asyncWrapper from '../errors/wrapper';
import isValid from 'date-fns/isValid';

const getTime = (req, res, next) => {
  let date1 = new Date();
  const startDate = add(date1, { hours: 9 });
  req.app.locals.time = startDate;
  console.log(req.app.locals.time);
  next();
};

const getDurationtime = (req, res, next) => {
  console.log(req.app.locals.time);
  let date2 = new Date();
  date2 = add(date2, { hours: 9 });
  const date3 = differenceInSeconds(date2, req.app.locals.time);
  console.log(date3);
  next();
};
export default {
  getTime: asyncWrapper(getTime),
  getDurationTime: asyncWrapper(getDurationtime),
};
