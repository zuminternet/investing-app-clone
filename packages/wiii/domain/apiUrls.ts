const setUrl = (...paths: string[]) => paths.join(`/`);

export const apiIndex = `/api` as const;

export const MARKET = `markets`;

export const enum marketName {
  /** 개별 historical 시세 */
  historical = `hist`,
  /** stocks 리스트 */
  stocks = `stock`,
  indexes = `index`,
  coins = `coin`,
}

export const SERVER_BASE_URL = `http://localhost:8080` as const;
/**
 * marketAPI home path
 * - /api/markets
 */
export const marketHome = setUrl(apiIndex, MARKET);

export const marketSubpaths = {
  historical: setUrl(``, marketName.historical),
  stocks: setUrl(``, marketName.stocks),
  indexes: setUrl(``, marketName.indexes),
  coins: setUrl(``, marketName.coins),
};

/** http://localhost:8080/api/markets */
const MARKET_BASE_URL = new URL(marketHome, SERVER_BASE_URL).href;

/** enum에서는 원시값만 입력가능하므로 readonly 객체로 생성 */
export const marketsFullUrl = {
  /** http://localhost:8080/api/markets/hist */
  historical: `${MARKET_BASE_URL}/${marketName.historical}`,
  stocks: `${MARKET_BASE_URL}/${marketName.stocks}`,
  indexes: `${MARKET_BASE_URL}/${marketName.indexes}`,
  coins: `${MARKET_BASE_URL}/${marketName.coins}`,
} as const;
