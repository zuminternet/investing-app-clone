/**
 * generator range
 * @param start 시작 index
 * @param end 종료 index
 * @param step
 */
export const range = function*(start = 0, end: number, step = 1) {
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
