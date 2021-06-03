import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

export interface BookmarkDocument {
  symbol: string;
  email: string;
}

/**
 * @description bookmark 데이터를 위한 모델 스키마
 */

const BookmarkSchema = new Schema({
  symbol: { type: String, required: true },
  email: { type: String, required: true },
});

const Bookmark = model<BookmarkDocument>('Bookmarks', BookmarkSchema);

export default Bookmark;
