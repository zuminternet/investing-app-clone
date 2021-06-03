import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

export interface BookmarkDocument {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

/**
 * @description bookmark 데이터를 위한 모델 스키마
 */

const BookmarkSchema = new Schema({
  email: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
});

const Bookmark = model<BookmarkDocument>('Bookmarks', BookmarkSchema);

export default Bookmark;
