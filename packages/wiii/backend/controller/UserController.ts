import { Controller, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

/**
 * @description
 * 회원관리 관련 api controller
 * - 회원가입
 * - logIn, logOut
 * @todo
 * - path enum
 */
@Controller({ path: '/user' })
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  /**
   * 회원 가입 Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/signUp' })
  public async postSignIn({ body }: Request, res: Response) {
    try {
      const { nickname, email, password } = body;
      const result = await this.userService.saveNewUser({ nickname, email, password });
      if (!result) throw new Error(`[SignUp] Fail to Sign-up`);
      res.status(200).json({ message: 'Success to Sign-up' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Fail to Sign-up' });
    }
  }

  /**
   * 로그인 Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/signIn' })
  public async postLogin({ body }: Request, res: Response) {
    try {
      const { email, password } = body;
      if (!email || !password) throw new Error(`[SignIn] Must Have Email or Password`);

      const isSuccess = await this.userService.login({ email, password });
      res.status(200).json({ message: 'Success to Sign-up' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: e });
    }
  }
}
