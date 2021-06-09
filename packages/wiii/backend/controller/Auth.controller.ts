import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { AuthService } from '../service/Auth.service';
import { ApiError } from '../utils/error/api';
import { TOKEN_COOKIE_KEY } from '../config/auth';
import { HOUR_ONE } from '../../domain/date';
import { signToken, verifyToken } from '../utils/auth/jwt';
import { redis } from '../utils/auth/redis';

/**
 * @description
 * 인증 관련 api controller
 * - logIn, logOut
 * - validate
 * @todo
 * - path enum
 */
@Controller({ path: '/api/auth' })
export class UserController {
  private error = (msg: string, funcName: string) => new ApiError(`Fail to ${msg}`, `---Ctrl:Auth:${funcName}: `);

  constructor(@Inject(AuthService) private service: AuthService) {}

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
      const isValid = await this.service.login({ email, password });
      if (!isValid) throw loginErr();

      // jwt token -> redis
      const token = signToken({ data: email });
      if (!token) throw loginErr();

      const isSessionOK = await redis.setValue(`sess:${email}`, token);
      if (!isSessionOK) throw loginErr();

      res.set({
        'Set-Cookie': `token=${token}; HttpOnly, Max-Age=${HOUR_ONE * 2}`,
        'Access-Control-Allow-Origin': '*',
      });
      res.json({ message: 'Success to Log-in' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Fail to Log-in' });
    }
  }

  /**
   * 로그아웃; Get
   */
  @GetMapping({ path: '/out' })
  public async logOut({ cookies, params }: Request, res: Response) {
    const logOutErr = () => this.error(`Get Log out`, this.logOut.name);
    try {
      const token = cookies[TOKEN_COOKIE_KEY];
      console.table({ token });
      if (!verifyToken(token)) throw logOutErr();

      const { email } = params;
      const isDeleted = redis.delete(`sess:${email}`);
      if (!isDeleted) throw logOutErr();

      res.clearCookie(TOKEN_COOKIE_KEY);
      res.redirect('/');
    } catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  }
}
