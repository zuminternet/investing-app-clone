import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { marketStackConfig } from '../../../common/backend/config';
import axios from 'axios';

@Service()
export default class MarketService {
  constructor() {}

  public async getStocks() {
    try {
      const { accessKey } = marketStackConfig;
      let stocks = await (await axios.get(`http://api.marketstack.com/v1/tickers?access_key=${accessKey}`)).data;

      if (stocks) {
        return stocks;
      }

      throw new Error('getting stocks was failed in MarketService');
    } catch (error) {
      console.log(error);
    }
  }
}
