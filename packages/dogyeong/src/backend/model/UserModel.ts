import mongoose from 'common/backend/mongoose';

const { Schema, model } = mongoose;

export interface UserDoc extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  isGoogleUser: boolean;
  id?: string;
  verifiedEmail?: boolean;
  picture?: string;
  locale?: string;
}

const UserSchema = new Schema({
  email: String,
  name: String,
  password: String,
  isGoogleUser: { type: Boolean, default: false },
  // 아래는 구글 유저만 저장되는 필드
  id: String,
  verifiedEmail: Boolean,
  picture: String,
  locale: String,
});

const User = model<UserDoc>('Users', UserSchema);

export default User;
