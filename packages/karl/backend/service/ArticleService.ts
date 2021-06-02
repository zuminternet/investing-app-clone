import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Article from '../../../common/backend/model/ArticleModel';

@Service()
export default class ArticleService {
  constructor() {}

  public async createArticles({ articles }) {
    await articles.forEach(async (article) => {
      const { image_url, title, text, source, date, tickers, type } = article;

      const result = await Article.create({ image_url, title, text, source, date, tickers, type });

      if (!result) {
        throw new Error('Article was not created in DB');
      }
    });

    return true;
  }
}
