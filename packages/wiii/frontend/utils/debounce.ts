/**
 * @todo 함수 수정
 * @see https://chaewonkong.github.io/posts/debounce-js.html
 */
export default (fn: Function, delay: number) => {
  let timeout;

  return function() {
    const ctx = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(ctx, args), delay);
  };
};
