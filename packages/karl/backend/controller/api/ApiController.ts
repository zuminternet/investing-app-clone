import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import SearchService from '../../../../common/backend/service/SearchService';
import MarketService from '../../service/MarketService';
import ItemDetailService from '../../../../common/backend/service/ItemDetailService';
// import ArticleService from '../../service/ArticleService';
import ArticleService from '../../../../common/backend/service/ArticleService';
import BookmarkService from '../../../../common/backend/service/BookmarkService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(SearchService) private searchService: SearchService,
    @Inject(MarketService) private marketService: MarketService,
    @Inject(ItemDetailService) private itemDetailService: ItemDetailService,
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(BookmarkService) private bookmarkService: BookmarkService,
  ) {}

  @GetMapping({ path: '/user' })
  public async getUser(request: Request, response: Response) {
    try {
      const token = request.cookies['jwt-token'];

      if (!token) {
        return response.sendStatus(401);
      }

      const decodedToken = this.authService.verifyToken(token);
      let user;

      if (decodedToken.googleId) {
        user = await this.userService.loginUserByGoogleOAuth(decodedToken);
      }

      user = await this.userService.loginUserByEmail(decodedToken);

      if (user) {
        return response.status(200).send(user);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @PostMapping({ path: '/user' })
  public async createUser(reqeust: Request, response: Response) {
    try {
      const user = await this.userService.createUser(reqeust.body);

      if (user) {
        return response.sendStatus(201);
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }

  @PostMapping({ path: '/auth/email' })
  public async loginUserByEmail(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByEmail(request.body);
      const token = this.authService.issueToken(user);

      if (token) {
        response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });

        return response.status(200).send(user);
      }

      response.sendStatus(401);
    } catch (error) {
      console.log(error);
      response.status(401).json(error);
    }
  }

  @PostMapping({ path: '/auth/google-oauth' })
  public async loginUserByGoogleOAuth(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByGoogleOAuth(request.body);
      const token = this.authService.issueToken(user);

      if (token) {
        response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });

        return response.status(200).send(user);
      }

      response.sendStatus(401);
    } catch (error) {
      console.log(error);
      response.status(401).json(error);
    }
  }

  /**
   *
   * @description Home page에 렌더링할 stocks들을 가져오는 controller
   * @param request
   * @param resposne
   */

  @GetMapping({ path: '/market/stock' })
  public async getStocks(request: Request, resposne: Response) {
    try {
      const stocks = await this.marketService.getStocks();

      if (stocks) {
        return resposne.status(200).send(stocks);
      }

      resposne.sendStatus(404);
    } catch (error) {
      console.log(error);
      resposne.status(404).json(error);
    }
  }

  /**
   * @description Home page에 렌더링할 indices를 가져오는 controller
   * @param request
   * @param resposne
   */
  @GetMapping({ path: '/market/indices' })
  public async getIndices(request: Request, resposne: Response) {
    try {
    } catch (error) {
      console.log(error);
      resposne.status(404).json(error);
    }
  }

  /**
   * @description Home page에 렌더링할 cpyto currencies를 가져오는 controller
   * @param request
   * @param resposne
   */
  @GetMapping({ path: '/market/cpyto-currencies' })
  public async getCryptoCurrencies(request: Request, resposne: Response) {
    try {
    } catch (error) {
      console.log(error);
      resposne.status(404).json(error);
    }
  }
  /**
   * @description item detail page에 렌더링할 item datail info를 가져오는 controller
   * @param request
   * @param resposne
   * @returns
   */

  @GetMapping({ path: '/item-detail' })
  public async getItemDetail(request: Request, resposne: Response) {
    try {
      const { symbols } = request.query;
      const itemDetailInfo = await this.itemDetailService.getItemDetail({ symbols });

      if (itemDetailInfo) {
        return resposne.status(200).send(itemDetailInfo);
      }

      resposne.sendStatus(404);
    } catch (error) {
      console.log(error);
      resposne.status(404).json(error);
    }
  }

  /**
   * @description search page에 렌더링할 searched items들을 가져오는 controller
   * @param request
   * @param response
   * @returns
   */
  @GetMapping({ path: '/search/items' })
  public async getSearchedItems(request: Request, response: Response) {
    try {
      const { keyword } = request.query;
      const items = await this.searchService.getSearchedItems({ keyword });

      if (items) {
        return response.status(200).send(items);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  /**
   * @description articles를 parsing하여 DB에 document들로 저장하는 controller(common에 추가할 때까지 주석처리)
   * @param request
   * @param response
   * @returns
   */
  // @PostMapping({ path: '/articles' })
  // public async createArticles(request: Request, response: Response) {
  //   try {
  //     const result = await this.articleService.createArticles(request.body);

  //     if (result) {
  //       response.sendStatus(201);

  //       return true;
  //     }
  //     response.sendStatus(409);
  //   } catch (error) {
  //     console.log(error);
  //     response.status(500).json(error);
  //   }
  // }

  /**
   * @description DB에서 articles 중 news만 가져오는 controller
   * @param request
   * @param response
   * @returns
   */
  @GetMapping({ path: '/articles/news' })
  public async getNews(request: Request, response: Response) {
    try {
      const news = await this.articleService.getNews(request.body);

      if (news) {
        return response.status(200).send(news);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description DB에서 articles 중 analyses만 가져오는 controller
   * @param request
   * @param response
   * @returns
   */
  @GetMapping({ path: '/articles/analyses' })
  public async getAnalyses(request: Request, response: Response) {
    try {
      const analyses = await this.articleService.getOpinions(request.body);

      if (analyses) {
        return response.status(200).send(analyses);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @PostMapping({ path: '/bookmark' })
  public async createBookmark(request: Request, response: Response) {
    try {
      const { email, symbol } = request.body;
      const bookmark = await this.bookmarkService.createBookmark({ email, symbol });

      if (bookmark) {
        return response.status(201).send(bookmark);
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.json(error);
    }
  }
}
