import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';
import { MarketSymbol, EndOfDay, SummaryDetail, HistoricalData } from 'common/domain';

declare const Axios: AxiosStatic;

export const getIndices = async (): Promise<EndOfDay[]> => {
  const { data } = await Axios.get(apiEndpoints.getIndices);
  return data;
};

export const getCoins = async (): Promise<EndOfDay[]> => {
  const { data } = await Axios.get(apiEndpoints.getCoins);
  return data;
};

export const getStocks = async (): Promise<EndOfDay[]> => {
  const { data } = await Axios.get(apiEndpoints.getStocks);
  return data;
};

export const getSummary = async (symbol: MarketSymbol): Promise<SummaryDetail> => {
  const { data } = await Axios.get(`${apiEndpoints.getSummary}/${symbol}`);
  return data;
};

export const getChart = async (symbol: MarketSymbol): Promise<HistoricalData> => {
  const { data } = await Axios.get(`${apiEndpoints.getChart}/${symbol}`);
  return data;
};
