import { AxiosStatic } from 'axios';
import { GetHistoricalOptions } from '../../domain/apiOptions';

declare const axios: AxiosStatic;

export const fetchHistoricalData = (options: GetHistoricalOptions) => {
  /** @todo option 조작, url query 생성, 예외, 에러처리 */
  return axios.get(``);
};
