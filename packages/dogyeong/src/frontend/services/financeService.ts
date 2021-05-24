import axios from 'axios';
import { apiEndpoints } from '@/config';

export const getIndices = async () => {
  const { data } = await axios.get(apiEndpoints.getIndices);
  return data;
};

export const getCoins = async () => {
  const { data } = await axios.get(apiEndpoints.getCoins);
  return data;
};

export const getStocks = async () => {
  const { data } = await axios.get(apiEndpoints.getStocks);
  return data;
};

export const getSummary = async () => {
  const { data } = await axios.get(apiEndpoints.getSummary);
  return data;
};

export const getChart = async () => {
  const { data } = await axios.get(apiEndpoints.getChart);
  return data;
};
