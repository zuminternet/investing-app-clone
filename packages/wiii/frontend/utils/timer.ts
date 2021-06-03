export default (fn: Function, title: string) => (...args) => {
  console.info(`[TIMER] ${title}`);
  console.time(title);
  const res = fn(...args);
  console.timeEnd(title);
  return res;
};
