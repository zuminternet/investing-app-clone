import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';

@Controller({ path: '/api' })
export class ApiController {
  constructor() {}

  @PostMapping({ path: '/user'})
  public async createUser(reqeust: Request, response: Response) {
    try {
      
    } catch (error) {
      
    }
  }



  // @GetMapping({ path: ['/'] })
  // public async getHome(req: Request, res: Response) {
    
  // }
}
