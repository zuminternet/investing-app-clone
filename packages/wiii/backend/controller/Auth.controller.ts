import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { AuthService } from '../service/Auth.service';
import { ApiError } from '../utils/error/api';
import { TOKEN_COOKIE_KEY } from '../config/auth';
import { HOUR_ONE } from '../../domain/date';

/**
 * @description
 * 인증 관련 api controller
 * - logIn, logOut
 * - validate
 * @todo
 * - path enum
 */
@Controller({ path: '/auth' })
export class UserController {
  private error: (msg: string, funcName: string) => ApiError;

  constructor(@Inject(AuthService) private service: AuthService) {
    this.error = (msg, funcName) => new ApiError(`Fail to ${msg}`, `---API:Ctrl:Auth:${funcName}: `);
  }

  /**
   * 로그인; Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/in' })
  public async logIn({ body }: Request, res: Response) {
    const loginErr = () => this.error(`Post Sign In`, this.logIn.name);
    try {
      const { email, password } = body;
      const token = await this.service.login({ email, password });
      if (!token) throw loginErr();

      res.cookie(TOKEN_COOKIE_KEY, token, { httpOnly: true, maxAge: HOUR_ONE * 2 });
      res.status(200).json({ message: 'Success to Log-in' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Fail to Log-in' });
    }
  }

  /**
   * 로그아웃; Get
   */
  @GetMapping({ path: '/out' })
  public async logOut({ cookies }: Request, res: Response) {
    const logOutErr = () => this.error(`Post Log in`, this.logOut.name);
    try {
      const token = cookies[TOKEN_COOKIE_KEY];
      if (!token) throw logOutErr();

      res.clearCookie(TOKEN_COOKIE_KEY);
      res.redirect('/');
    } catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  }
}
