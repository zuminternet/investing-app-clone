export enum actionTypes {
  setCurrentView = 'setCurrentView',
}

export enum ChartDataEnums {
  stockData = 'stockData',
  coinData = 'coinData',
  indexData = 'indexData',
}

export enum ChartModuleMapperEnums {
  stateIsStockLoaded = 'isStockLoaded',
  actionGetStockData = 'getStockData',
  getterCheckStockLoaded = 'loadedStockData',
}
