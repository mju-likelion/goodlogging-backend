import giveBadge from './giveBadge';

const calculateLevel = async (level, req) => {
  let result = 0;
  // 뱃지 부여
  await giveBadge('브론즈', req); // 공통

  if (level === '초급') {
    result = 36000;
  } else if (level === '중급') {
    await giveBadge('실버', req);
    result = 72000;
  } else {
    await giveBadge('실버', req);
    await giveBadge('골드', req);
    result = 108000;
  }
  return result;
};

export default calculateLevel;
