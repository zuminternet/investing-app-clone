// @ts-nocheck
export default (ref: HTMLElement) => {
  const io = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;

      if (!target?.dataset?.src) continue;

      target.src = target.dataset.src;
      target.removeAttribute('data-src');

      io.disconnect();
    }
  });
  io.observe(ref);
};
