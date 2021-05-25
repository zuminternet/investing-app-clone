import { User } from '../model'
import { Service } from 'zum-portal-core/backend/decorator/Alias'
import * as jsonwebtoken from 'jsonwebtoken'
import { jwtSecret } from '../config'


export interface issueTokenInfo {
  email: string,
  password: string
}

@Service()
export default class AuthService {
  constructor() {}

  public issueToken({email, password}: issueTokenInfo): (string | Error) {
    const token = jsonwebtoken.sign({ email, password }, jwtSecret)

    if (token) {
      return token
    }

    throw new Error('Token was not issued') 
  }

  public verifyToken(token: string): (string | Object) {
    const decodedToken = jsonwebtoken.verify(token, jwtSecret)

    if (decodedToken) {
      return decodedToken
    }
    
    throw new Error('Token was not decoded')
  }  
}