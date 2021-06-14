import { isValidObjectId, ObjectId } from 'mongoose';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import Article, { ArticleType, ArticleDoc } from '../model/ArticleModel';
import * as NodeCache from 'node-cache';
import { FilterQuery, Document } from 'mongoose';

const cache = new NodeCache({ deleteOnExpire: true });
const cacheTTL = 30;

interface FetchArticlesProps {
  offset: number;
  limit: number;
  findQuery: FilterQuery<ArticleDoc>;
  sortQuery: {
    [key in keyof Omit<ArticleDoc, keyof Document>]?: 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending';
  };
}

/**
 * ArticleService
 *
 * 뉴스, 의견 데이터를 fetch하는 서비스 클래스
 *
 * @author dogyeong
 */
@Service()
export default class ArticleService {
  /**
   * getTickerOption
   *
   * ticker 배열을 받아서 mongoose 쿼리 옵션 객체로 반환하는 메소드
   *
   * @param tickers ticker 심볼 배열
   */
  private getTickerOption(tickers?: string[]) {
    return tickers ? { tickers: { $in: tickers } } : {};
  }

  /**
   * fetchArticles
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param findQuery find()에 전달되는 쿼리 객체
   * @param sortQuery sort()에 전달되는 쿼리 객체
   */
  private fetchArticles({ offset, limit, findQuery, sortQuery }: FetchArticlesProps) {
    return Article.find(findQuery)
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  /**
   * getNews
   *
   * news 타입의 article들을 반환하는 메소드
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param tickers ticker 심볼 배열
   */
  @Caching({ ttl: cacheTTL, runOnStart: false, cache })
  public async getNews(offset = 0, limit = 10, tickers?: string[]): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const findQuery = { type: ArticleType.news, ...tickerOption };

    return this.fetchArticles({ offset, limit, findQuery, sortQuery: { date: 'desc' } });
  }

  /**
   * getOpinions
   *
   * opinion 타입의 article들을 반환하는 메소드
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param tickers ticker 심볼 배열
   */
  @Caching({ ttl: cacheTTL, runOnStart: false, cache })
  public async getOpinions(offset = 0, limit = 10, tickers?: string[]): Promise<ArticleDoc[]> {
    const tickerOption = this.getTickerOption(tickers);
    const findQuery = { type: ArticleType.opinions, ...tickerOption };

    return this.fetchArticles({ offset, limit, findQuery, sortQuery: { date: 'desc' } });
  }

  /**
   * getArticleById
   *
   * article의 ObjectId를 받아서 해당 document를 반환하는 메소드
   *
   * @param id ObjectId
   */
  @Caching({ ttl: cacheTTL, runOnStart: false, cache })
  public async getArticleById(id: ObjectId | string): Promise<ArticleDoc> {
    if (!isValidObjectId(id)) throw new Error('invalid id');

    return Article.findById(id).lean<ArticleDoc>();
  }
}
