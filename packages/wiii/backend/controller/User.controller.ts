import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { UserService } from '../service/User.service';
import { ApiError } from '../utils/error/api';
import { TOKEN_COOKIE_KEY } from '../config/auth';

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
  private error: (msg: string, funcName: string) => ApiError;

  constructor(@Inject(UserService) private service: UserService) {
    this.error = (msg, funcName) => new ApiError(`Fail to ${msg}`, `---API:Ctrl:User:${funcName}: `);
  }

  /**
   * 회원 가입; Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/' })
  public async postSignIn({ body }: Request, res: Response) {
    const joinErr = () => this.error(`Post Sign In`, this.postSignIn.name);
    try {
      const { nickname, email, password } = body;
      const result = await this.service.createUser({ nickname, email, password });
      if (!result) throw joinErr();
      res.status(200).json({ message: 'Success to Sign-up' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Fail to Sign-up' });
    }
  }

  /**
   * @todo
   * 회원 정보 조회; Get
   */
  @GetMapping({ path: '/' })
  public async getUserInfo({ cookies }: Request, res: Response) {
    const getErr = () => this.error(`Get User Info`, this.getUserInfo.name);
    try {
      const token = cookies[TOKEN_COOKIE_KEY];
      if (!token) throw getErr();

      /** @todo */
      const info = {};

      res.json(info);
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: 'Fail to Get User Info' });
    }
  }

  /**
   * @todo
   * 회원 수정; Put
   */

  /**
   * @todo
   * 회원 수정; Delete
   */
}
