const setUrl = (...paths: string[]) => paths.join(``);

export const apiIndex = `/api` as const;

/**
 * marketAPI url
 */
export const marketHome = setUrl(apiIndex, `/markets`);
/** enum에서는 원시값만 입력가능하므로 readonly 객체로 생성 */
export const markets = {
  /** 개별 주식 */
  historical: setUrl(marketHome, `/hist`),
  stocks: setUrl(marketHome, `/stocks`),
  indexes: setUrl(marketHome, `/indexes`),
  coins: setUrl(marketHome, `/coins`),
} as const;

console.info(markets.historical);
