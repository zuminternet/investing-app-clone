export interface RootState {
  ticker: string;
  auth: boolean;
  email: string;
}

export enum RootActions {
  SET_CURRENT_TICKER = 'SET_CURRENT_TICKER',
}

export enum StoreNames {
  Theme = 'Theme',
  Reply = 'Reply',
  Auth = 'Auth',
  User = 'User',
}

export enum ChartDataEnums {
  stockData = 'stockData',
  coinData = 'coinData',
  indexData = 'indexData',
}
