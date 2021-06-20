import { Singleton } from 'zum-portal-core/backend/decorator/Alias';
import BaseAppContainer from 'zum-portal-core/backend/BaseAppContainer';
import { Application } from 'express';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import { container } from 'tsyringe';
import chalk from 'chalk';
import logger from 'zum-portal-core/backend/util/Logger';

@Singleton()
export class AppContainer extends BaseAppContainer {
  public app: Application;

  constructor(@Yml('application') private application) {
    super();
  }

  /**
   * 서버 시작 메소드
   */
  public listen(): void {
    const port = this.application.port || 8080;
    this.app.listen(port, () => {
      logger.info(`${chalk.bgYellow(process.env.NODE_ENV)} - ${chalk.bgGreen(process.env.ZUM_BACK_MODE)} Startup!`);
    });
  }
}

export const appContainer = container.resolve(AppContainer);
