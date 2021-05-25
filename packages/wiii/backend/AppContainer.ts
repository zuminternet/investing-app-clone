import { Singleton } from 'zum-portal-core/backend/decorator/Alias';
import BaseAppContainer from 'zum-portal-core/backend/BaseAppContainer';
import { Application } from 'express';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import { container } from 'tsyringe';
import logger from 'zum-portal-core/backend/util/Logger';
import chalk from 'chalk';

@Singleton()
export class AppContainer extends BaseAppContainer {
  public app: Application;

  /**
   * @todo
   * - middleware 등록
   * - constructor initMiddleware로 middleware 넘길 수 있음; BaseAppContainer 코드 참고
   */
  constructor(@Yml('application') private application) {
    super();
  }

  /**
   * @description
   * 서버 실행
   */
  public listen(): void {
    const port = this.application.port || 8080;
    this.app.listen(port, () => {
      logger.info(`${chalk.bgYellow(process.env.NODE_ENV)} - ${chalk.bgGreen(process.env.ZUM_BACK_MODE)} Startup!`);
    });
  }
}

export const appContainer = container.resolve(AppContainer);
