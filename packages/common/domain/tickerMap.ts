// 지수, 주식, 가상화폐 tickers
export default {
  index: {
    // 실제 api에서 사용되는 ticker
    FB: {
      //  화면에 표시될 종목 이름
      name: '나스닥 100',
      // investingId end point 이름
      investingId: 'indices/nq-100',
      // 화면에 표시될 소속 이름
      category: 'zum-investing-app',
    },
    ADBE: {
      name: '다우존스 30',
      investingId: 'indices/us-30',
      category: 'zum-investing-app',
    },
    ADI: {
      name: 'S&P 500',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ADP: {
      name: '코스피',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ADSK: {
      name: '코스닥',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    FIS: {
      name: '러셀 2000',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MU: {
      name: 'CBOE VIX',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ABNB: {
      name: '캐나다 S&P',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MDLZ: {
      name: '브라질 보베스파',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ZTS: {
      name: 'DAX',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    INFY: {
      name: '영국 FTSE',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    GM: {
      name: '프랑스 CAC',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MO: {
      name: '유로 스톡스 50',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    PTR: {
      name: '네덜란드 AEX',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    CCI: {
      name: '스위스 SMI',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
  crypto: {
    BIDU: {
      name: 'Bitcoin',
      investingId: 'crypto/bitcoin/btc-usd',
      category: 'zum-investing-app',
    },
    EBAY: {
      name: 'Ethereum',
      investingId: 'crypto/ethereum/eth-usd?c997650',
      category: 'zum-investing-app',
    },
    INTC: {
      name: 'Tether',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MAR: {
      name: 'XRP',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MNST: {
      name: 'Bitcoin Cash',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    USB: {
      name: 'Bitcoin SV',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ENB: {
      name: 'Cardano',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MRNA: {
      name: 'Litecoin',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    CI: {
      name: 'Binance Coin',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    COP: {
      name: 'Chainlink',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    BNS: {
      name: 'EOS',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    DUK: {
      name: 'Tezos',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    TJX: {
      name: 'Stellar',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    CME: {
      name: 'Monero',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    BAM: {
      name: 'TRON',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
  stock: {
    AAPL: {
      name: '애플',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    GOOG: {
      name: '구글',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    TSLA: {
      name: '테슬라',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    AMZN: {
      name: '아마존',
      investingId: 'equities/amazon-com-inc',
      category: 'NASDAQ',
    },
    PYPL: {
      name: '페이팔',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    BABA: {
      name: '알리바바',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    V: {
      name: '비자',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    NVDA: {
      name: '엔비디아',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    JPM: {
      name: 'JP모건',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    JNJ: {
      name: '존슨앤존슨',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    WMT: {
      name: '월마트',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    MA: {
      name: '마스터카드',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    BAC: {
      name: '뱅크 오브 아메리카',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    HD: {
      name: '홈디포',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    DIS: {
      name: '월트 디즈니',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
  },
} as const;
