import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import SearchService from '../../../../common/backend/service/SearchService';

@Controller({ path: '/api' })
export class ApiController {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(SearchService) private searchService: SearchService,
  ) {}

  @GetMapping({ path: '/user' })
  public async getUser(request: Request, response: Response) {
    try {
      // 토큰 인증자리
      // 토큰 인증되면 클라이언트에 user 정보 보내기
      const token = request.cookies['jwt-token'];

      // 토큰이 없으면
      if (!token) {
        response.sendStatus(401);

        return false;
      }

      const decodedToken = this.authService.verifyToken(token);
      const user = await this.userService.loginUserByEmail(decodedToken);

      if (user) {
        response.status(200).send(user);

        return true;
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @PostMapping({ path: '/user' })
  public async createUser(reqeust: Request, response: Response) {
    try {
      const user = await this.userService.createUser(reqeust.body);

      if (user) {
        response.sendStatus(200);

        return true;
      }

      response.sendStatus(409);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }

  @PostMapping({ path: '/auth/email' })
  public async loginUserByEmail(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByEmail(request.body);
      const token = this.authService.issueToken(user);

      if (token) {
        response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });
        response.status(200).send(user);

        return true;
      }

      response.sendStatus(401);
    } catch (error) {
      console.log(error);
      response.status(401).json(error);
    }
  }

  @PostMapping({ path: '/auth/google-oauth' })
  public async loginUserByGoogleOAuth(request: Request, response: Response) {
    try {
      const user = await this.userService.loginUserByGoogleOAuth(request.body);
      const token = this.authService.issueToken(user);

      if (token) {
        response.cookie('jwt-token', token, { expires: new Date(Date.now() + 9000000), httpOnly: true });
        response.status(200).send(user);

        return true;
      }

      response.sendStatus(401);
    } catch (error) {
      console.log(error);
      response.status(401).json(error);
    }
  }

  @GetMapping({ path: '/search/items' })
  public async getSearchedItems(request: Request, response: Response) {
    try {
      const { keyword } = request.query;
      const items = await this.searchService.getSearchedItems({ keyword });

      if (items) {
        response.status(200).send(items);

        return true;
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  // @GetMapping({ path: '/search/stocks' })
  // 검색 뉴스 가져오는 controller

  // @GetMapping({ path: '/search/analysis' })
  // 검색 분석 가져오는 controller
}
