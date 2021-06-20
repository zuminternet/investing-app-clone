import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FinnhubConfigs } from '../../config/market';

/**
 * finnhub.io API 활용
 * 1초 30 call, 1분 60 call 제한
 * @see https://finnhub.io/docs/api/company-basic-financials
 *
 * 회사 프로필; 종목명, 연락처, 홈페이지, ipo 날짜, 거래소 등
 * @example https://finnhub.io/api/v1/stock/profile2?symbol={293490.KQ}&token=
 * 재무, 손익, 신고가, 신저가 등
 * @example https://finnhub.io/api/v1/stock/metric?symbol={293490.KQ}&metric=all&token=
 * peer group
 * @example https://finnhub.io/api/v1/stock/peers?symbol={005930.KS}&token=
 * 검색; 국내외 주식, 인덱스
 * @example https://finnhub.io/api/v1/search?q={kakao}&token=
 * 코인 차트
 * @example https://finnhub.io/api/v1/crypto/candle?symbol={BINANCE:BTCUSDT}&resolution=D&from={1572651390}&to={1575243390}&token=
 */

const { BASE, KOSPI_SUFFIX } = FinnhubConfigs;

const setUrl = (paths: string[]) => `${BASE}${paths.join('/')}`;
const setAxiosConfig = (params: object): AxiosRequestConfig => ({
  maxRedirects: 1,
  responseType: 'json',
  params: { ...params, token: FinnhubConfigs.ACCESS_KEY },
});

const profileUrl = setUrl(['stock', 'profile2']);
const metricUrl = setUrl(['stock', 'metric']);
const peerUrl = setUrl(['stock', 'peers']);

export const getStockOverview = async (ticker: string) => {
  const profilePeerConfig = setAxiosConfig({ symbol: ticker + KOSPI_SUFFIX });
  const metricConfig = setAxiosConfig({ symbol: ticker + KOSPI_SUFFIX, metric: 'all' });

  const requests = [
    ['profile', axios.get(profileUrl, profilePeerConfig)],
    ['metric', axios.get(metricUrl, metricConfig)],
    ['peer', axios.get(peerUrl, profilePeerConfig)],
  ] as [string, Promise<AxiosResponse>][];

  const overview = {};

  for await (const [key, rq] of requests) {
    const { data, status, statusText } = await rq;
    if (status >= 400) throw Error(statusText);
    overview[key] = data;
  }

  return overview;
};
