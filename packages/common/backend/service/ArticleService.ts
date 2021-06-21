import { isValidObjectId, ObjectId } from 'mongoose';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import Article, { ArticleType, ArticleDoc } from '../model/ArticleModel';
import { ReplyDoc } from '../model/ReplyModel';
import * as NodeCache from 'node-cache';
import { FilterQuery, Document } from 'mongoose';

const cache = new NodeCache({ deleteOnExpire: true });
const cacheTTL = 30;

export interface ArticleWithReplies extends ArticleDoc {
  replies: ReplyDoc[];
  replyCount: number;
}

interface FetchArticlesProps {
  offset: number;
  limit: number;
  findQuery: FilterQuery<ArticleDoc>;
  sortQuery:
    | {
        [key in keyof Omit<ArticleDoc, keyof Document>]?: 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending';
      }
    | string;
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
    return tickers?.length ? { tickers: { $in: tickers } } : {};
  }

  /**
   * getSortQuery
   *
   * 쿼리할 때 필요한 정렬 옵션을 반환하는 메소드
   * 기본적으로 date를 내림차순으로 정렬하고, sortByReply가 true면 먼저 replyCount를 내림차순으로 정렬한다
   *
   * @param sortByReply 댓글 갯수순으로 정렬할지 여부
   */
  private getSortQuery(sortByReply: boolean) {
    return `${sortByReply ? '-replyCount' : ''} -date`;
  }

  /**
   * getFindQuery
   *
   * 쿼리할 때 필요한 조건 옵션을 반환하는 메소드 .match()에 전달된다.
   *
   * @param tickers 포함되어야 할 ticker 심볼 배열, 하나라도 포함되면 매칭됨
   * @param type 기사 종류. 뉴스인지 의견인지
   */
  private getFindQuery(tickers: string[], type: ArticleType) {
    const tickerOption = this.getTickerOption(tickers);
    return { type, ...tickerOption };
  }

  /**
   * fetchArticles
   *
   * 댓글, 댓글 수 필드를 추가하고 전달받은 옵션대로 쿼리하는 메소드
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param findQuery find()에 전달되는 쿼리 객체
   * @param sortQuery sort()에 전달되는 쿼리 객체
   */
  private fetchArticles({ offset, limit, findQuery, sortQuery }: FetchArticlesProps) {
    return Article.aggregate()
      .match(findQuery)
      .addFields({ stringId: { $toString: '$_id' } })
      .lookup({
        from: 'replies',
        localField: 'stringId',
        foreignField: 'docId',
        as: 'replies',
      })
      .addFields({ replyCount: { $size: '$replies' } })
      .sort(sortQuery)
      .skip(offset)
      .limit(limit);
  }

  /**
   * getNews
   *
   * news 타입의 article들을 반환하는 메소드
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param tickers 포함되어야 할 ticker 심볼 배열
   * @param sortByReply 추가적으로 댓글 갯수순으로 정렬할 것인지 여부
   */
  // @Caching({ ttl: cacheTTL, runOnStart: false, cache })
  public async getNews(offset = 0, limit = 10, tickers: string[] = [], sortByReply = false): Promise<ArticleWithReplies[]> {
    const findQuery = this.getFindQuery(tickers, ArticleType.news);
    const sortQuery = this.getSortQuery(sortByReply);

    return this.fetchArticles({ offset, limit, findQuery, sortQuery });
  }

  /**
   * getOpinions
   *
   * opinion 타입의 article들을 반환하는 메소드
   *
   * @param offset skip 쿼리 offset
   * @param limit 받아올 article 개수
   * @param tickers 포함되어야 할 ticker 심볼 배열
   * @param sortByReply 추가적으로 댓글 갯수순으로 정렬할 것인지 여부
   */
  @Caching({ ttl: cacheTTL, runOnStart: false, cache })
  public async getOpinions(offset = 0, limit = 10, tickers?: string[], sortByReply = false): Promise<ArticleWithReplies[]> {
    const findQuery = this.getFindQuery(tickers, ArticleType.opinions);
    const sortQuery = this.getSortQuery(sortByReply);

    return this.fetchArticles({ offset, limit, findQuery, sortQuery });
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
