import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService'
import AuthService from '../../service/AuthService'

@Controller({ path: '/api' })
export class ApiController {
  constructor(@Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authService: AuthService
  ) {}

  @GetMapping({ path: '/user'})
  public async getUser(request: Request, response: Response) {
    
  }

  @PostMapping({ path: '/user'})
  public async createUser(reqeust: Request, response: Response) {
    try {
      await this.userService.createUser(reqeust.body)

      response.sendStatus(200)
    } catch (error) {
      response.status(500).json(error)
    }
  }

  @PostMapping({ path: '/auth/email'})
  public async loginUserByEmail(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByEmail(request.body)
      const token = this.authService.issueToken(user)

      response.status(200).send({user, token})
    } catch (error) {
      response.status(401).json(error)
    }
  }
}
