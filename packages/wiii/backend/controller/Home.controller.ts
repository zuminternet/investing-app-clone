import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import { HomeFacade } from '../facade/HomeFacade';

@Controller({ path: '/' })
export class HomeController {
  constructor(@Yml('application') private application: any, @Inject(HomeFacade) private homeFacade: HomeFacade) {}

  @GetMapping({ path: ['/*'] })
  public async getHome(req: Request, res: Response) {
    //탬플릿처리
    await this.homeFacade.renderHtml();
    return res.render(this.application.template.index, { content: this.homeFacade.ssrHtml[req.originalUrl] });
  }
}
