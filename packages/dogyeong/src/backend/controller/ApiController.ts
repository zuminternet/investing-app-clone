import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import AuthService from '../service/AuthService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @GetMapping({ path: ['/auth/google'] })
  public async loginGoogleUser(req: Request, res: Response) {
    const code = req.headers['inv_google_auth'];

    if (!code) {
      return res.status(400).json({ message: 'Invalid Header' });
    }

    const userInfo = await this.authService.getUserInfo(code);

    res.json({ user: userInfo });
  }

  @GetMapping({ path: ['/user'] })
  public getUserInfo(req: Request, res: Response) {}
}
