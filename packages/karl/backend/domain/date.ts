const secondUnit = 1000;
const hourUnit = 60 * 60 * secondUnit;
const dayUnit = 24 * hourUnit;
const weekUnit = dayUnit * 7;
const yearUnit = dayUnit * 365;

const times = {
  //캐싱 60초
  caching: 60,
};

export { times };
