export default (ref: Element) => {
  const io = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;

      const img = target.getElementsByTagName('img')[0];
      if (!img?.dataset?.src) continue;

      img.src = img.dataset.src;
      img.removeAttribute('data-src');

      io.disconnect();
    }
  });
  io.observe(ref);
};
