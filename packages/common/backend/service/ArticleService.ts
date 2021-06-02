import { isValidObjectId, ObjectId } from 'mongoose';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Article, { ArticleType, ArticleDoc } from '../model/ArticleModel';

interface QueryProps {
  offset?: number;
  limit?: number;
}

@Service()
export default class ArticleService {
  public async getNews({ offset = 0, limit = 10 }: QueryProps): Promise<ArticleDoc[]> {
    return Article.find({ type: ArticleType.news })
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  public async getOpinions({ offset = 0, limit = 10 }: QueryProps): Promise<ArticleDoc[]> {
    return Article.find({ type: ArticleType.opinions })
      .sort({ date: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ArticleDoc[]>();
  }

  public async getArticleById(id: ObjectId | string): Promise<ArticleDoc> {
    if (!isValidObjectId(id)) throw new Error('invalid id');

    return Article.findById(id).lean<ArticleDoc>();
  }
}
