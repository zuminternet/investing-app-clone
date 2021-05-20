import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwtsecretyeah';

@Service()
export default class TokenService {
  constructor() {}

  public createToken(payload: string | object) {
    return jwt.sign(payload, JWT_SECRET);
  }

  public verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
