import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwtsecretyeah';

@Service()
export default class TokenService {
  constructor() {}

  public createToken(payload: string | object) {
    if (!payload) throw new Error('invalid payload');

    return jwt.sign(payload, JWT_SECRET);
  }

  public verifyToken(token: string) {
    if (!token) throw new Error('invalid token');

    return jwt.verify(token, JWT_SECRET);
  }
}
