/** 숫자를 세 자리 마다 쉼표를 넣은 문자로 변환한다 (1000 -> '1,000') */
export const addComma = (value: string | number) => {
  return value
    .toString()
    .split('')
    .reverse()
    .reduce((acc, digit, i) => {
      if (i > 0 && i % 3 === 0) acc.push(',');
      return [...acc, digit];
    }, [])
    .reverse()
    .join('');
};

/** 문자로 Date객체를 생성하여 일정한 포맷으로 반환한다 (2021/06/15) */
export const formatDate = (value: string) => {
  return new Date(value)
    .toLocaleDateString()
    .replaceAll('. ', '/')
    .replace('.', '')
    .split('/')
    .map((n) => n.padStart(2, '0'))
    .join('/');
};

/** 숫자에 부호를 붙이고 소수점 2자리까지의 문자열로 변환한다 */
export const formatNumber = (value: number) => {
  const sign = value > 0 ? '+' : '';
  const fixedValue = value.toFixed(2);
  return `${sign}${fixedValue}`;
};

/** 숫자를 괄호와 퍼센트기호를 붙인 문자열로  변환한다 */
export const formatPercent = (value: number) => {
  return `(${value}%)`;
};
