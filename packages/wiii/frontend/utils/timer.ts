export default (fn: Function, title: string) => {
  console.info(`[TIMER] ${title}`);
  console.time(title);
  fn();
  console.timeEnd(title);
};
