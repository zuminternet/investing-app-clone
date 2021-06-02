import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import AuthService from '../service/AuthService';
import UserService, { GoogleUserInfo, UserInfo } from '../service/UserService';
import TokenService from '../service/TokenService';
import MarketService from '../service/MarketService';
import { authConfig } from '../config';
import ArticleService from 'common/backend/service/ArticleService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
    @Inject(TokenService) private tokenService: TokenService,
    @Inject(MarketService) private marketService: MarketService,
    @Inject(ArticleService) private articleService: ArticleService,
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

  @GetMapping({ path: ['/indices'] })
  public async getIndices(req: Request, res: Response) {
    try {
      const indices = await this.marketService.getIndices();
      res.json({ indices });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/coins'] })
  public async getCoins(req: Request, res: Response) {
    try {
      const coins = await this.marketService.getCoins();
      res.json({ coins });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/stocks'] })
  public async getStocks(req: Request, res: Response) {
    try {
      const stocks = await this.marketService.getStocks();
      res.json({ stocks });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/summary'] })
  public async getSummary(req: Request, res: Response) {
    try {
      const symbol = this.getRandomSymbol();
      const summary = await this.marketService.getSummaryDetail(symbol);
      res.json(summary);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/chart'] })
  public async getChart(req: Request, res: Response) {
    try {
      const symbol = this.getRandomSymbol();
      const chart = await this.marketService.getCandleChartData(symbol);
      res.json({ chart });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  /** @TODO Implement random symbol generator */
  private getRandomSymbol() {
    return ['TSLA'][0];
  }

  @GetMapping({ path: ['/news/new'] })
  public async getNewNews(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query;
      const news = await this.articleService.getNews({ offset: +offset, limit: +limit });
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/opinions/new'] })
  public async getNewOpinions(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query;
      const news = await this.articleService.getOpinions({ offset: +offset, limit: +limit });
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/news/popular'] })
  public async getPopularNews(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query;
      const news = await this.articleService.getNews({ offset: +offset, limit: +limit });
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/opinions/popular'] })
  public async getPopularOpinions(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query;
      const news = await this.articleService.getOpinions({ offset: +offset, limit: +limit });
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
