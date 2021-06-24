import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

export const enum ArticleType {
  news = 'news',
  opinions = 'opinions',
}

export interface ArticleDoc extends mongoose.Document {
  image_url: string;
  title: string;
  text: string;
  source: string;
  date: Date;
  tickers: string[];
  type: ArticleType;
}

/**
 * 뉴스, 의견 데이터를 위한 모델 스키마
 */
const ArticleSchema = new Schema({
  image_url: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
  tickers: [String],
  type: {
    type: String,
    enum: [ArticleType.news, ArticleType.opinions],
    default: ArticleType.news,
  },
});

const Article = model<ArticleDoc>('Articles', ArticleSchema);

export default Article;
