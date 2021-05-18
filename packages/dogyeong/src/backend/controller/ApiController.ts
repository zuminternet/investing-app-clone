import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import Axios from 'axios';

const session = {};

@Controller({ path: '/api' })
export class ApiController {
  constructor(@Yml('oauthConfig') private OAuthConfig: any) {}

  @GetMapping({ path: ['/auth'] })
  public getAuth(req: Request, res: Response) {
    const {
      googleOAuthConfig: { baseUrl, scope, responseType, redirectUrl, clientId },
    } = this.OAuthConfig;

    const OAuthUrl =
      `${baseUrl}?` +
      `scope=${scope}&` +
      `include_granted_scopes=true&` +
      `response_type=${responseType}&` +
      `redirect_uri=${redirectUrl}&` +
      `client_id=${clientId}`;

    res.json({ url: OAuthUrl });
  }

  @GetMapping({ path: ['/auth/redirect'] })
  public async getAccessToken(req: Request, res: Response) {
    const { code, error } = req.query;

    if (error) {
      console.error(error);
      return res.json({ message: error });
    }

    try {
      const {
        googleOAuthAccessTokenConfig: { baseUrl, clientSecret, grantType, redirectUri },
        googleOAuthConfig: { clientId },
        goolgeUserInfoApiUrl,
      } = this.OAuthConfig;

      const response = await Axios.post(baseUrl, {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: grantType,
        redirect_uri: redirectUri,
      });

      const { data } = await Axios.get(goolgeUserInfoApiUrl, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      session[data.id] = data;
      res.cookie('_INVESTING_SID_', data.id);
      res.redirect('/');
    } catch (e) {
      console.log(e);
    }
  }

  @GetMapping({ path: ['/user'] })
  public getUserInfo(req: Request, res: Response) {
    const sid = req.cookies['_INVESTING_SID_'];
    res.json({ userInfo: session[sid] || null });
  }
}
