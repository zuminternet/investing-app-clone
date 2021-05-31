import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

/**
 * @description 뉴스, 의견 데이터를 위한 모델 스키마
 */
const ArticleSchema = new Schema({
  image_url: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: Date, required: true },
  tickers: [String],
  type: { type: String, enum: ['news', 'opinions'], default: 'news' },
});

const Article = model('Articles', ArticleSchema);

export default Article;
