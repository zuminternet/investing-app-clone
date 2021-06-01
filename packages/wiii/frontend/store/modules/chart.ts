import { Module, VuexModule } from 'vuex-module-decorators'

@Module
export default class Chart extends VuexModule {
  public stockData: Object = {};
  public indexData: Object = {};
  public coinData: Object = {};
}
