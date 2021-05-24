const addPadToStr = (num: number) => (str: string | number): string => String(str).padStart(num, '0');
const add4Pad = addPadToStr(4);
const add2Pad = addPadToStr(2);

const getDateFromDate = (date: Date = new Date()): string => {
  if (isNaN(date.getTime())) return;
  const yyyy = add4Pad(date.getFullYear());
  const mm = add2Pad(date.getMonth() + 1);
  const dd = add2Pad(date.getDate());
  return `${yyyy}-${mm}-${dd.toString().padStart(2, '0')}`;
};

const getDateFromString = (date: string): string => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return;
  return getDateFromDate(dateObj);
};

export const getDateString = (date: string | number | Date = new Date()): string => {
  if (typeof date === typeof Date || typeof date === 'object') return getDateFromDate(date as Date);
  if (typeof date === 'string' || typeof date === 'number') return getDateFromString(date as string);
  return;
};
