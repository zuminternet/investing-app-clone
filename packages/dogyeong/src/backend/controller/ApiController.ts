import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(@Inject(AuthService) private authService: AuthService, @Inject(UserService) private userService: UserService) {}

  @GetMapping({ path: ['/auth/google'] })
  public async loginGoogleUser(req: Request, res: Response) {
    const code = req.headers['inv_google_auth'];

    if (!code) {
      return res.status(400).json({ message: 'Invalid Header' });
    }

    const userInfo = await this.authService.getUserInfo(code);

    if (!userInfo) {
      return res.json({});
    }

    // 가입 안되어있으면 계정 생성하고, 유저 정보 반환
    const user = await this.userService.createGoogleUser(userInfo);

    // create jwt

    res.json({ user });
  }

  @PostMapping({ path: ['/user'] })
  public async createUser(req: Request, res: Response) {
    try {
      await this.userService.createUser(req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ ...err });
    }
  }

  @PostMapping({ path: ['/auth'] })
  public async loginUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserByEmailAndPassword(req.body);

      if (!user) return res.status(400).send('Email or Password is incorrect');

      res.json({ user });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
