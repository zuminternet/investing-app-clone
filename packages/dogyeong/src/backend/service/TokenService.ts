import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { UserInfo, GoogleUserInfo } from './UserService';

@Service()
export default class TokenService {
  public createToken(payload: string | UserInfo | GoogleUserInfo) {
    if (!payload) throw new Error('invalid payload');

    return jwt.sign(payload, jwtConfig.secret);
  }

  public verifyToken(token: string) {
    if (!token) throw new Error('invalid token');

    return jwt.verify(token, jwtConfig.secret);
  }
}
