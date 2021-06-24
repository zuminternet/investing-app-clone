import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';
import { MarketSymbol, EndOfDay, SummaryDetail, HistoricalData, ChartPeriod } from 'common/domain';

declare const Axios: AxiosStatic;

interface GetChartProps {
  symbol: MarketSymbol;
  period: ChartPeriod;
}

export const getIndices = async () => {
  const { data } = await Axios.get<EndOfDay[]>(apiEndpoints.getIndices);
  return data;
};

export const getCoins = async () => {
  const { data } = await Axios.get<EndOfDay[]>(apiEndpoints.getCoins);
  return data;
};

export const getStocks = async () => {
  const { data } = await Axios.get<EndOfDay[]>(apiEndpoints.getStocks);
  return data;
};

export const getSummary = async (symbol: MarketSymbol) => {
  const { data } = await Axios.get<SummaryDetail>(`${apiEndpoints.getSummary}/${symbol}`);
  return data;
};

export const getChart = async ({ symbol, period = '1d' }: GetChartProps) => {
  const { data } = await Axios.get<HistoricalData>(`${apiEndpoints.getChart}/${symbol}`, { params: { period } });
  return data;
};
