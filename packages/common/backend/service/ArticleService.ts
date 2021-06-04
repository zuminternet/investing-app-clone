import { isValidObjectId, ObjectId } from 'mongoose';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import Article, { ArticleType, ArticleDoc } from '../model/ArticleModel';

interface QueryProps {
  offset?: number;
  limit?: number;
  tickers?: string[];
}

@Service()
export default class ArticleService {
  private getTickerOption(tickers?: string[]) {
    return tickers ? { tickers: { $in: tickers } } : {};
  }

  @Caching({ ttl: 10, runOnStart: false })
  public async getNews({ offset = 0, limit = 10, tickers }: QueryProps = {}): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const query = { type: ArticleType.news, ...tickerOption };

    return Article.find(query)
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  @Caching({ ttl: 10, runOnStart: false })
  public async getOpinions({ offset = 0, limit = 10, tickers }: QueryProps = {}): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const query = { type: ArticleType.opinions, ...tickerOption };

    return Article.find(query)
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  @Caching({ ttl: 10, runOnStart: false })
  public async getArticleById(id: ObjectId | string): Promise<ArticleDoc> {
    if (!isValidObjectId(id)) throw new Error('invalid id');

    return Article.findById(id).lean<ArticleDoc>();
  }
}
