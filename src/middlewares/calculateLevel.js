const calculateLevel = (level) => {
  let result = 0;
  if (level === 'beginner') {
    result = 36000;
  } else if (level === 'intermediate') {
    result = 72000;
  } else {
    result = 108000;
  }
  return result;
};

export default calculateLevel;
