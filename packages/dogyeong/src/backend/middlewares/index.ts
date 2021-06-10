import { Request, Response, NextFunction } from 'express';
import { authConfig } from '../config';
import { UserDoc } from '../model/UserModel';
import TokenService from '../service/TokenService';

const tokenService = new TokenService();

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[authConfig.accessTokenCookie];

  if (!token) {
    req.body.user = null;
    next();
  }

  req.body.user = tokenService.verifyToken(token) as UserDoc;
  next();
};
