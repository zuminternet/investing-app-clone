import chalk from 'chalk';

/**
 * generator range
 * @param start 시작 index
 * @param end 종료 index
 * @param step
 */
export const _range = function*(start = 0, end: number, step = 1) {
  while (start < end) {
    yield start;
    start += step;
  }
};

/**
 * pipe
 * @param data 원본 데이터
 * @param funcs iterable 데이터 정제 함수들
 * @returns 정제된 iterable 데이터 객체
 */
export const pipe = (data: any, ...funcs: Function[]) => {
  return funcs.reduce((acc, fn) => fn(acc), data);
};

export const IS_PRO_MODE = process.env.NODE_ENV === `production`;

/**
 * 개발 모드에서만 디버깅 위해 사용
 * @param result
 * @param title
 * @returns
 */
export const devPrint = () => {
  if (IS_PRO_MODE) return;
  return (result: any, title?: string) => {
    console.log(chalk`{rgb(0,255,51) ${`[devPrint]`}} result of {rgb(224,231,34) ${title ?? `this function`}}:`);
    console.dir(result);
  };
};

devPrint()({ IS_PRO_MODE });
