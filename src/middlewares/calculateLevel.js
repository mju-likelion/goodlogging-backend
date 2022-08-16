const calculateLevel = (level) => {
  let result = 0;
  if (level === '초급') {
    result = 36000;
  } else if (level === '중급') {
    result = 72000;
  } else {
    result = 108000;
  }
  return result;
};

export default calculateLevel;
