import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';
import { InvestingApiResponse, CandleChartData, SummaryDetail } from '../../backend/service/MarketService';

declare const Axios: AxiosStatic;

interface IndicesResponse {
  indices: InvestingApiResponse[];
}

interface CoinsResponse {
  coins: InvestingApiResponse[];
}

interface StocksResponse {
  stocks: InvestingApiResponse[];
}

interface ChartResponse {
  chart: CandleChartData[];
}

export const getIndices = async (): Promise<IndicesResponse> => {
  const { data } = await Axios.get(apiEndpoints.getIndices);
  return data;
};

export const getCoins = async (): Promise<CoinsResponse> => {
  const { data } = await Axios.get(apiEndpoints.getCoins);
  return data;
};

export const getStocks = async (): Promise<StocksResponse> => {
  const { data } = await Axios.get(apiEndpoints.getStocks);
  return data;
};

export const getSummary = async (): Promise<SummaryDetail> => {
  const { data } = await Axios.get(apiEndpoints.getSummary);
  return data;
};

export const getChart = async (): Promise<ChartResponse> => {
  const { data } = await Axios.get(apiEndpoints.getChart);
  return data;
};
