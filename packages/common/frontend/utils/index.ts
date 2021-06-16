const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = day * 365;

/**
 * fromNow
 *
 * 입력한 시간이 현재 시간보다 얼마나 전인지 표현하는 문자를 반환하는 함수
 * ex) 몇 초 전, 12분 전, 2달 전...
 *
 * @param {string | Date} date Date 객체의 생성자에 전달되는 데이터
 * @return {string}
 */
export const fromNow = (date: string | Date): string => {
  const nowTimeStamp = Date.now();
  const dateTimeStamp = new Date(date).getTime();
  const diff = nowTimeStamp - dateTimeStamp;

  if (diff < minute) return '몇 초 전';
  if (diff < hour) return `${Math.floor(diff / minute)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  if (diff < month) return `${Math.floor(diff / day)}일 전`;
  if (diff < year) return `${Math.floor(diff / month)}달 전`;
  return `${Math.floor(diff / year)}년 전`;
};

export const isEmptyObject = (object) => {
  return Object.keys(object).length === 0;
};
