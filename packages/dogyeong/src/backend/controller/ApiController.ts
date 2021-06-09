import { Controller, GetMapping, PostMapping, PutMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';
import TokenService from '../service/TokenService';
import { authConfig } from '../config';
import { UserDoc } from '../model/UserModel';

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

      if (!userInfo) return res.status(400).json({ message: 'Invalid grant code' });

      let user = await this.userService.getUserByEmail(userInfo.email);

      if (!user) user = await this.userService.createGoogleUser(userInfo);

      const token = this.tokenService.createToken(user);

      res.cookie(authConfig.accessTokenCookie, token, authConfig.cookieOptions);
      res.json({ user: { name: user.name, isGoogleUser: true } });
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
      res.json({ user: { name: user.name, isGoogleUser: false } });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/user'] })
  public async getUser(req: Request, res: Response) {
    try {
      const token = req.cookies[authConfig.accessTokenCookie];
      const { email } = this.tokenService.verifyToken(token) as UserDoc;
      const user = await this.userService.getUserByEmail(email);

      if (!user) throw new Error();

      const { name, isGoogleUser } = user;

      res.json({ user: { name, isGoogleUser } });
    } catch (err) {
      res.clearCookie(authConfig.accessTokenCookie);
      res.status(403).json('Invalid token');
    }
  }

  @GetMapping({ path: ['/logout'] })
  public logout(req: Request, res: Response) {
    res.clearCookie(authConfig.accessTokenCookie);
    res.end();
  }

  @PutMapping({ path: ['/user'] })
  public async changeUserInfo(req: Request, res: Response) {
    try {
      const { password, name } = req.body;

      if (!password && !name) return res.status(400).send('Invalid parameters');

      const token = req.cookies[authConfig.accessTokenCookie];

      if (!token) return res.status(400).send('Invalid token');

      const { email } = this.tokenService.verifyToken(token) as UserDoc;

      if (!email) return res.status(400).send('Invalid token');

      const user = await this.userService.updateUser({ email, password, name });

      res.json(user);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
