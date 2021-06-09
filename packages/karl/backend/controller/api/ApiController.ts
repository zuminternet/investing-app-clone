import { Controller, DeleteMapping, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import ChartService from '../../service/ChartService';
import MarketService from '../../service/MarketService';
import SearchService from '../../../../common/backend/service/SearchService';
import ItemDetailService from '../../../../common/backend/service/ItemDetailService';
import ArticleService from '../../../../common/backend/service/ArticleService';
import BookmarkService from '../../../../common/backend/service/BookmarkService';

import { tickerMap } from '../../../../common/domain';

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
    @Inject(ChartService) private chartService: ChartService,
  ) {}

  private getTickerArray(tickers: any) {
    if (typeof tickers === 'string') return [tickers];
    return tickers;
  }

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
   * @returns response
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
   * @returns response
   */
  @GetMapping({ path: '/market/indices' })
  public async getIndices(request: Request, response: Response) {
    try {
      const indices = await this.marketService.getIndices();

      if (indices) {
        return response.status(200).send(indices);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  @GetMapping({ path: '/market/cryptos' })
  public async getCryptos(request: Request, response: Response) {
    try {
      const cryptos = await this.marketService.getCryptos();

      if (cryptos) {
        return response.status(200).send(cryptos);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  /**
   * @description Home page에 렌더링할 cpyto currencies를 가져오는 controller
   * @param request
   * @param resposne
   * @reutrns response
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
   * @returns response
   */

  @GetMapping({ path: '/item-detail' })
  public async getItemDetail(request: Request, resposne: Response) {
    try {
      const { symbols, email } = request.query;
      const itemDetailInfo = await this.itemDetailService.getItemDetail({ symbols });

      if (itemDetailInfo) {
        itemDetailInfo.isBookmarked = await this.bookmarkService.getIsBookmarked({ email, symbols });
        itemDetailInfo.isStock = tickerMap.stock[symbols] ? true : false;
        itemDetailInfo.symbol = symbols;

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
   * @returns response
   */
  @GetMapping({ path: '/search/items' })
  public async getSearchedItems(request: Request, response: Response) {
    try {
      const { keyword, email } = request.query;
      let items = await this.searchService.getSearchedItems({ keyword });

      console.log(items, 'con');

      if (items) {
        for (let i = 0; i < items.length; i++) {
          const { symbol } = items[i];
          const isBookmarked = await this.bookmarkService.getIsBookmarked({ email, symbols: symbol });

          items[i].isBookmarked = isBookmarked;
        }

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
   * @returns response
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
   * @returns response
   */
  @GetMapping({ path: '/articles/news' })
  public async getNews(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;
      const news = await this.articleService.getNews({ offset: +offset, limit: +limit, tickers: this.getTickerArray(tickers) });

      if (news) {
        return response.status(200).send(news);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description DB에서 articles 중 검색된 news만 가져오는 controller
   * @param request
   * @param response
   * @returns
   */
  @GetMapping({ path: '/search/news' })
  public async getNewsForSearch(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;

      const news = await this.articleService.getNewsForSearch({
        offset: +offset,
        limit: +limit,
        tickers: this.getTickerArray(tickers),
      });

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
   * @returns response
   */
  @GetMapping({ path: '/articles/analyses' })
  public async getAnalyses(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;
      const analyses = await this.articleService.getOpinions({
        offset: +offset,
        limit: +limit,
        // tickers: this.getTickerArray(tickers),
      });

      if (analyses) {
        return response.status(200).send(analyses);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @GetMapping({ path: '/search/analyses' })
  public async getAnalysesForSearch(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;
      const analyses = await this.articleService.getOpinionsForSearch({
        offset: +offset,
        limit: +limit,
        // tickers: this.getTickerArray(tickers),
      });

      if (analyses) {
        return response.status(200).send(analyses);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description DB에서 bookmark documents를 추가하는 controller
   * @param request
   * @param response
   * @returns response
   */

  @PostMapping({ path: '/bookmark' })
  public async createBookmark(request: Request, response: Response) {
    try {
      const { email, symbol, name, category } = request.body;
      const bookmark = await this.bookmarkService.createBookmark({ email, symbol, name, category });

      if (bookmark) {
        return response.status(201).send(bookmark);
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.json(error);
    }
  }

  @DeleteMapping({ path: '/bookmark' })
  public async deleteBookmark(request: Request, response: Response) {
    try {
      const { email, symbol, name, category } = request.body;

      const result = await this.bookmarkService.deleteBookmark({ email, symbol, name, category });

      if (result) {
        return response.sendStatus(200);
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.json(error);
    }
  }
  /**
   * @description DB에서 bookmark documents를 가져오는 controller
   * @param request
   * @param response
   * @returns response
   */
  @GetMapping({ path: '/bookmark' })
  public async getBookmarks(request: Request, response: Response) {
    try {
      const { email } = request.query;
      const bookmarks = await this.bookmarkService.getBookmarks(email);

      if (bookmarks) {
        return response.status(200).send(bookmarks);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.json(error);
    }
  }

  @GetMapping({ path: '/chart/historical' })
  public async getHistoricalData(request: Request, response: Response) {
    try {
      const { symbol, from, to, period } = request.query;
      const data = await this.chartService.getHistoricalData({ symbol, from, to, period });

      if (data) {
        return response.status(200).send(data);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }
}
