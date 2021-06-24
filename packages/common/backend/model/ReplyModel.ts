import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

export interface ReplyProps {
  /** 종목 티커 또는 뉴스 id */
  docId: string;
  /** 사용자 모델 interface가 조금씩 달라서 모두 합침 */
  /** 사용자 썸네일 사진 */
  picture?: string;
  userThumbnail?: string;
  /** 사용자 email */
  email: string;
  /** 사용자 이름 */
  name?: string;
  userName?: string;
  /** 댓글 내용 */
  contents: string;
}

/**
 * 댓글 모델; Mongoose 버전
 * @author wiii
 * @see packages/wiii/backend/db/entity/Reply.entity.ts ; TypeORM 버전
 */
export interface ReplyDoc extends ReplyProps, mongoose.Document {
  /** 좋아요 수 */
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 종목, 뉴스 댓글 스키마
 */
const ReplySchema = new Schema({
  docId: { type: String, required: true },
  picture: { type: String },
  userThumbnail: { type: String },
  email: { type: String, required: true },
  name: { type: String },
  userName: { type: String },
  // isParent: { type: Boolean, default: true },
  // parentReply: { type: String },
  contents: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const Reply = model<ReplyDoc>('Reply', ReplySchema);

export default Reply;
