import { Facade } from 'zum-portal-core/backend/decorator/Alias';

// const path = require('path');
// const fs = require('fs');

/**
 * MarketFacade
 * @description
 * - Service -> Face -> Controller 구조로 로직 분리 필요한 경우 사용
 */
@Facade()
export class MarketFacade {
  /**
   * @constructor
   * @param marketApi 시세 관련 설정 `resources/marketApi.yml`에서 불러옴
   */
  constructor() /** @Yml('application') private application */ {}

  /** @todo controller에서 사용할 methods.. */
}
