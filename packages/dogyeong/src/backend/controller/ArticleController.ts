import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import ArticleService from 'common/backend/service/ArticleService';

@Controller({ path: '/api/article' })
export class ApiController {
  constructor(@Inject(ArticleService) private articleService: ArticleService) {}

  private getTickerArray(tickers: any) {
    if (typeof tickers === 'string') return [tickers];
    return tickers;
  }

  @GetMapping({ path: ['/news/new'] })
  public async getNewNews(req: Request, res: Response) {
    try {
      const { offset, limit, tickers } = req.query;
      const news = await this.articleService.getNews(+offset, +limit, this.getTickerArray(tickers), false);
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/opinions/new'] })
  public async getNewOpinions(req: Request, res: Response) {
    try {
      const { offset, limit, tickers } = req.query;
      const news = await this.articleService.getOpinions(+offset, +limit, this.getTickerArray(tickers), false);
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/news/popular'] })
  public async getPopularNews(req: Request, res: Response) {
    try {
      const { offset, limit, tickers } = req.query;
      const news = await this.articleService.getNews(+offset, +limit, this.getTickerArray(tickers), true);
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/opinions/popular'] })
  public async getPopularOpinions(req: Request, res: Response) {
    try {
      const { offset, limit, tickers } = req.query;
      const news = await this.articleService.getOpinions(+offset, +limit, this.getTickerArray(tickers), true);
      res.json(news);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/:id'] })
  public async getArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') throw new Error('id is not string');

      const article = await this.articleService.getArticleById(id);
      res.json(article);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
