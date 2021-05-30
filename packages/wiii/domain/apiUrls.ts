const setUrl = (...paths: string[]) => paths.join(`/`);

export const apiIndex = `/api` as const;

export const MARKET = `markets`;

export const enum marketName {
  /** 개별 historical 시세 */
  historical = `hist`,
  /** stocks 리스트 */
  stocks = `stocks`,
  indexes = `indexes`,
  coins = `coins`,
}

export const SERVER_BASE_URL = `http://localhost:8080` as const;
/**
 * marketAPI home url
 */
export const marketHome = setUrl(apiIndex, MARKET);

export const marketSubpaths = {
  historical: setUrl(``, marketName.historical),
  stocks: setUrl(``, marketName.stocks),
  indexes: setUrl(``, marketName.indexes),
  coins: setUrl(``, marketName.coins),
};

const MARKET_BASE_URL = new URL(marketHome, SERVER_BASE_URL);
/** enum에서는 원시값만 입력가능하므로 readonly 객체로 생성 */
export const marketsFullUrl = {
  historical: new URL(marketName.historical, MARKET_BASE_URL).href,
  stocks: new URL(marketName.stocks, MARKET_BASE_URL).href,
  indexes: new URL(marketName.indexes, MARKET_BASE_URL).href,
  coins: new URL(marketName.coins, MARKET_BASE_URL).href,
} as const;

console.log(marketsFullUrl);
