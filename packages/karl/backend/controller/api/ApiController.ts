import { Controller, DeleteMapping, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import ChartService from '../../service/ChartService';
import MarketService from '../../service/MarketService';
import SearchService from 'common/backend/service/SearchService';
import ItemDetailService from 'common/backend/service/ItemDetailService';
import ArticleService from 'common/backend/service/ArticleService';
import BookmarkService from 'common/backend/service/BookmarkService';
import ReplyService from 'common/backend/service/ReplyService';

import { tickerMap, tickerKeys } from 'common/domain';

interface itemForRandom {
  value: number;
  diff: number;
  growthRate: number;
}

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
    @Inject(ReplyService) private replyService: ReplyService,
  ) {}

  private createRandom() {
    return (Math.random() > 0.5 ? 2 : -2) * Math.random();
  }

  private addRandom(item: itemForRandom) {
    const random = this.createRandom();
    const { diff, growthRate } = item;

    item.value = +(item.value + random).toFixed(2);
    item.diff = +(item.diff + random).toFixed(2);
    item.growthRate = ((diff + random) * growthRate) / diff;

    return item;
  }

  private addRandomForItemDetail(itemDetail) {
    const random = this.createRandom();
    const { upDownPrice, upDownRate } = itemDetail;

    itemDetail.close = +(itemDetail.close + random).toFixed(2);
    itemDetail.upDownPrice = +(itemDetail.upDownPrice + random).toFixed(2);
    itemDetail.upDownRate = ((upDownPrice + random) * upDownRate) / upDownRate;

    return itemDetail;
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
      response.sendStatus(500).json(error);
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
      response.sendStatus(500).json(error);
    }
  }

  @PostMapping({ path: '/auth/google-oauth' })
  public async loginUserByGoogleOAuth(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByGoogleOAuth(request.body);
      const token = this.authService.issueToken(user);

      response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });

      return response.status(200).send(user);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
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
  public async getStocks(request: Request, response: Response) {
    try {
      let stocks = await this.marketService.getStocks();

      stocks = stocks.map((stock) => {
        return this.addRandom(stock);
      });

      if (stocks) {
        return response.status(200).send(stocks);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
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
      let indices = await this.marketService.getIndices();

      indices = indices.map((indice) => {
        return this.addRandom(indice);
      });

      if (indices) {
        return response.status(200).send(indices);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
    }
  }

  @GetMapping({ path: '/market/cryptos' })
  public async getCryptos(request: Request, response: Response) {
    try {
      let cryptos = await this.marketService.getCryptos();

      cryptos = cryptos.map((crypto) => {
        return this.addRandom(crypto);
      });

      if (cryptos) {
        return response.status(200).send(cryptos);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
    }
  }

  /**
   * @description item detail page에 렌더링할 item datail info를 가져오는 controller
   * @param request
   * @param resposne
   * @returns response
   */

  @GetMapping({ path: '/item-detail' })
  public async getItemDetail(request: Request, response: Response) {
    try {
      const { symbols, email } = request.query;
      let itemDetailInfo = await this.itemDetailService.getItemDetail({ symbols });

      itemDetailInfo = this.addRandomForItemDetail(itemDetailInfo);

      if (itemDetailInfo) {
        itemDetailInfo.isBookmarked = await this.bookmarkService.getIsBookmarked({ email, symbols });
        itemDetailInfo.isStock = tickerMap.stock[symbols] ? true : false;
        itemDetailInfo.symbol = symbols;

        return response.status(200).send(itemDetailInfo);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
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

      console.log(items);

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
      response.sendStatus(500).json(error);
    }
  }

  /**
   * @description DB에서 articles 중 news만 가져오는 controller
   * @param request
   * @param response
   * @returns response
   */
  @GetMapping({ path: '/articles/news' })
  public async getNews(request: Request, response: Response) {
    try {
      const { offset, limit } = request.query;
      let { tickers, sortByReply } = request.query;
      console.log(sortByReply);
      sortByReply = sortByReply === 'true' ? true : false;

      let keyword;
      let news;

      if (tickers) {
        [keyword] = tickers;
        tickers = tickerKeys.filter((key) => {
          return key.includes(keyword);
        });

        news = await this.articleService.getNews(+offset, +limit, tickers, sortByReply);
      }

      if (!tickers) {
        news = await this.articleService.getNews(+offset, +limit, [], sortByReply);
      }

      if (news) {
        return response.status(200).send(news);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
    }
  }

  @GetMapping({ path: '/article/:id' })
  public async getArticleById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const news = await this.articleService.getArticleById(id);

      if (news) {
        return response.status(200).send(news);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
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
      const { offset, limit, sortByReply } = request.query;
      let { tickers } = request.query;
      let keyword;
      let analyses;

      if (tickers) {
        [keyword] = tickers;
        tickers = tickerKeys.filter((key) => {
          return key.includes(keyword);
        });

        analyses = await this.articleService.getOpinions(+offset, +limit, tickers, sortByReply);
      }

      if (!tickers) {
        analyses = await this.articleService.getOpinions(+offset, +limit, [], sortByReply);
      }

      if (analyses) {
        return response.status(200).send(analyses);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
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
      response.sendStatus(500).json(error);
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
      response.sendStatus(500).json(error);
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
      response.sendStatus(500).json(error);
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
      response.sendStatus(500).json(error);
    }
  }

  @PostMapping({ path: '/reply' })
  public async createReply(request: Request, response: Response) {
    try {
      const { email, docId, contents } = request.body;

      const result = await this.replyService.createReply({ email, docId, contents, userName: email });

      if (result) {
        return response.sendStatus(201);
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.sendStatus(500).json(error);
    }
  }

  @GetMapping({ path: '/reply/:docId' })
  public async getRepliesByDocId(request: Request, response: Response) {
    try {
      const { docId } = request.params;

      const results = await this.replyService.getAllReplsByDocId(docId);

      if (results) {
        return response.status(200).json({ message: 'Success to Get All Replies', results });
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }
}
