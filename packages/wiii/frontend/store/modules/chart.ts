import Polygon from '@/services/chart/polygon';
import { ChartDataEnums } from '@/store/types';
import { GetMultiDaysStockProps } from '@/type/apis';
import { MultidaysStockData } from '@/type/chart';
import { Module, MutationAction, VuexModule } from 'vuex-module-decorators';

@Module
export default class Chart extends VuexModule {
  public stockData: MultidaysStockData = {};
  public isStockLoaded: boolean = false;
  public indexData: Object = {};
  public coinData: Object = {};

  get loadedStockData() {
    return this.stockData;
  }

  /**
   * @todo
   * - dataKey 활용해 caching, 이전 데이터 삭제
   * - action - mutations 분리
   */
  @MutationAction
  public async getStockData(options: GetMultiDaysStockProps) {
    try {
      const { results, resultsCount, dataKey } = await Polygon.getMultiDaysStockData(options);
      if (!results || resultsCount === 0) throw new Error('No Stocks Results from Polygon');
      const result = { [ChartDataEnums.stockData]: { results, resultsCount, dataKey } };
      this.isStockLoaded = true;
      return result;
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
