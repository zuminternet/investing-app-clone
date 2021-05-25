import { Controller, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { HomeFacade } from '../facade/HomeFacade';

/**
 * @description
 * 회원관리 관련 api controller
 * - 회원가입
 * - logIn, logOut
 */
@Controller({ path: '/user' })
export class UserController {
  constructor(@Inject(HomeFacade) private homeFacade: HomeFacade) {
    //
  }

  /**
   * 회원 가입 Post
   */
  @PostMapping({ path: '/signIn' })
  postSignIn(req: Request, res: Response) {
    //
  }
}
