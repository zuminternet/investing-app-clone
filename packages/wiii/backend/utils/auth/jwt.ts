import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/db';

export const verifyToken = (token: string, options?: VerifyOptions) => {
  try {
    const verified = verify(token, SECRET_KEY, { ...options, algorithms: ['ES512'] });
    console.info({ verified });
    return verified;
  } catch (e) {
    return console.error(e);
  }
};

export const signToken = (payload, options?: SignOptions) => {
  try {
    const token = sign(payload, SECRET_KEY, { ...options, algorithm: 'ES512', expiresIn: '2h' });
    console.info({ token });
    return token;
  } catch (e) {
    return console.error(e);
  }
};
