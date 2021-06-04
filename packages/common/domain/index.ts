// 지수, 주식, 가상화폐
export const tickerMap = {
  index: {
    IXIC: {
      investing: 'indices/nq-100',
      name: '나스닥100',
    },
    DJI: {
      investing: 'indices/us-30',
      name: '다우존스30',
    },
    SPX: {
      investing: 'indices/us-spx-500',
      name: 'S&P500',
    },
  },
  crypto: {
    BTC: {
      investing: 'crypto/bitcoin/btc-usd',
      name: '비트코인',
    },
    ETH: {
      investing: 'crypto/ethereum/eth-usd?c997650',
      name: '이더리움',
    },
  },
  stock: {
    APPL: {
      investing: 'equities/apple-computer-inc',
      name: '애플',
    },
    GOOG: {
      investing: 'equities/google-inc',
      name: '구글',
    },
    TSLA: {
      investing: 'equities/tesla-motors',
      name: '테슬라',
    },
  },
} as const;

// 캐시 관련
const secondUnit = 1000;
const hourUnit = 60 * 60 * secondUnit;
const dayUnit = 24 * hourUnit;
const weekUnit = dayUnit * 7;
const yearUnit = dayUnit * 365;

export const times = {
  //캐싱 60초
  caching: 60,
};

// 개발 모드
export const isProductionMode = process.env.MODE_ENV === 'production';
