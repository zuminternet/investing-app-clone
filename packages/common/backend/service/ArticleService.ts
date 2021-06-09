import { isValidObjectId, ObjectId } from 'mongoose';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import Article, { ArticleType, ArticleDoc } from '../model/ArticleModel';
import * as NodeCache from 'node-cache';

const cache = new NodeCache({ deleteOnExpire: true });

@Service()
export default class ArticleService {
  private getTickerOption(tickers?: string[]) {
    return tickers ? { tickers: { $in: tickers } } : {};
  }

  @Caching({ ttl: 30, runOnStart: false, cache })
  public async getNews(offset = 0, limit = 10, tickers?: string[]): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const query = { type: ArticleType.news, ...tickerOption };

    return Article.find(query)
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  @Caching({ ttl: 30, runOnStart: false, cache })
  public async getOpinions(offset = 0, limit = 10, tickers?: string[]): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const query = { type: ArticleType.opinions, ...tickerOption };

    return Article.find(query)
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  @Caching({ ttl: 30, runOnStart: false, cache })
  public async getArticleById(id: ObjectId | string): Promise<ArticleDoc> {
    if (!isValidObjectId(id)) throw new Error('invalid id');

    return Article.findById(id).lean<ArticleDoc>();
  }
}
