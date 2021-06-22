// 지수, 주식, 가상화폐 tickers
export default {
  index: {
    // 실제 api에서 사용되는 ticker
    '나스닥 100': {
      //  화면에 표시될 종목 이름
      symbol: 'FB',
      // investingId end point 이름
      investingId: 'indices/nq-100',
      // 화면에 표시될 소속 이름
      category: 'zum-investing-app',
    },
    '다우존스 30': {
      symbol: 'ADBE',
      investingId: 'indices/us-30',
      category: 'zum-investing-app',
    },
    'S&P 500': {
      symbol: 'ADI',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    코스피: {
      symbol: 'ADP',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    코스닥: {
      symbol: 'ADSK',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '러셀 2000': {
      symbol: 'FIS',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    'CBOE VIX': {
      symbol: 'MU',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '캐나다 S&P': {
      symbol: 'ABNB',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '브라질 보베스파': {
      symbol: 'MDLZ',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    DAX: {
      symbol: 'ZTS',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '영국 FTSE': {
      symbol: 'INFY',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '프랑스 CAC': {
      symbol: 'GM',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '유로 스톡스 50': {
      symbol: 'MO',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '네덜란드 AEX': {
      symbol: 'PTR',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '스위스 SMI': {
      symbol: 'CCI',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
  crypto: {
    비트코인: {
      symbol: 'BIDU',
      investingId: 'crypto/bitcoin/btc-usd',
      category: 'zum-investing-app',
    },
    이더리움: {
      symbol: 'EBAY',
      investingId: 'crypto/ethereum/eth-usd?c997650',
      category: 'zum-investing-app',
    },
    테더: {
      symbol: 'INTC',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    리플: {
      symbol: 'MAR',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '비트코인 캐쉬': {
      symbol: 'MNST',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    '비트코인 SV': {
      symbol: 'USB',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    카다노: {
      symbol: 'ENB',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    라이트코인: {
      symbol: 'MRNA',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    바이낸스코인: {
      symbol: 'CI',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    체인링크: {
      symbol: 'COP',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    이오스: {
      symbol: 'BNS',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    테조스: {
      symbol: 'DUK',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    스텔라: {
      symbol: 'TJX',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    모네로: {
      symbol: 'CME',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    트론: {
      symbol: 'BAM',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
} as const;
