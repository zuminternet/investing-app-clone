import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import AuthService from '../service/AuthService';
import UserService, { GoogleUserInfo, UserInfo } from '../service/UserService';
import TokenService from '../service/TokenService';
import { authConfig } from '../config';

@Controller({ path: '/api' })
export class ApiController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
    @Inject(TokenService) private tokenService: TokenService,
  ) {}

  @PostMapping({ path: ['/user'] })
  public async createUser(req: Request, res: Response) {
    try {
      await this.userService.createUser(req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/auth/google'] })
  public async loginGoogleUser(req: Request, res: Response) {
    try {
      const grantCode = req.headers[authConfig.googleGrantCodeHeader];

      if (!grantCode) return res.status(400).json({ message: 'Invalid Header' });

      const userInfo = await this.authService.getUserInfo(grantCode);

      if (!userInfo) return res.json({});

      // 가입 안되어있으면 계정을 생성하고, 유저 정보 반환
      const user = await this.userService.createGoogleUser(userInfo);
      const token = this.tokenService.createToken(user);

      res.cookie(authConfig.accessTokenCookie, token, authConfig.cookieOptions);
      res.json({ user: { name: user.name } });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @PostMapping({ path: ['/auth'] })
  public async loginUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserByEmailAndPassword(req.body);

      if (!user) return res.status(400).send('Email or Password is incorrect');

      const token = this.tokenService.createToken(user);

      res.cookie(authConfig.accessTokenCookie, token, authConfig.cookieOptions);
      res.json({ user: { name: user.name } });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/user'] })
  public async getUser(req: Request, res: Response) {
    try {
      const token = req.cookies[authConfig.accessTokenCookie];
      const { name } = this.tokenService.verifyToken(token) as GoogleUserInfo | UserInfo;

      res.json({ user: { name } });
    } catch (err) {
      res.clearCookie(authConfig.accessTokenCookie);
      res.status(403).json('invalid token');
    }
  }

  @GetMapping({ path: ['/logout'] })
  public logout(req: Request, res: Response) {
    res.clearCookie(authConfig.accessTokenCookie);
    res.end();
  }
}
