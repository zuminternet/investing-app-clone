import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/db';

export const verifyToken = (token: string, options?: VerifyOptions) => {
  try {
    const verified = verify(token, SECRET_KEY, { ...options });
    console.info({ verified });
    return verified;
  } catch (e) {
    return console.error(e);
  }
};

export const signToken = (payload, options?: SignOptions) => {
  try {
    /** RS 계열 알고리즘 사용시 옵션 추가 필요 */
    const token = sign(payload, SECRET_KEY, { ...options, expiresIn: '2h' });
    return token;
  } catch (e) {
    return console.error(e);
  }
};
