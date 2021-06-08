import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { ReplyService } from '../service/Reply.service';

/**
 * @description
 * 회원관리 관련 api controller
 * - 회원가입
 * - logIn, logOut
 * @todo
 * - path enum
 */
@Controller({ path: '/reply' })
export class ReplyController {
  constructor(@Inject(ReplyService) private userService: ReplyService) {}

  /**
   * 댓글 등록 Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/' })
  public async postSignIn({ body }: Request, res: Response) {
    try {
      // const { nickname, email, password } = body;
      // const result = await this.userService.saveNewUser({ nickname, email, password });
      // if (!result) throw new Error(`[SignUp] Fail to Sign-up`);
      res.status(200);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: `Fail to add new Reply: ${e}` });
    }
  }

  /**
   * 해당 페이지 댓글 불러오기
   * @todo
   */
  @GetMapping({ path: '/' })
  public async getReplsByDoc({ body }: Request, res: Response) {
    try {
      // const { email, password } = body;
      // if (!email || !password) throw new Error(`[SignIn] Must Have Email or Password`);

      // const isSuccess = await this.userService.login({ email, password });
      res.status(200).json({ message: 'Success to Sign-up' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: `Fail to add new Reply: ${e}` });
    }
  }
}
