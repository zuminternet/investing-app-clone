import { Schema, model } from 'mongoose';

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

const User = model('Users', UserSchema);

export default User;
