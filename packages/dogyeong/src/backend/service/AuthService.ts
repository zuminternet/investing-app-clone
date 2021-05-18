import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import Axios from 'axios';

@Service()
export default class AuthService {
  constructor(@Yml('oauthConfig') private OAuthConfig) {}

  /**
   * 사용자를 인증 동의 페이지로 리다이렉트 시키기 위한 url을 반환
   */
  public getAuthRedirectionUrl() {
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

    return OAuthUrl;
  }

  /**
   * 사용자의 동의를 받고 얻은 코드로 사용자 정보를 받아와서 반환
   * @param code
   * @returns userInfo | null
   */
  public async getUserInfo(code) {
    const {
      googleOAuthAccessTokenConfig: { baseUrl, clientSecret, grantType, redirectUri },
      googleOAuthConfig: { clientId },
      goolgeUserInfoApiUrl,
    } = this.OAuthConfig;

    const accessTokenRequestBody = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: grantType,
      redirect_uri: redirectUri,
    };

    try {
      // code로 access token 받아오기
      const {
        data: { access_token },
      } = await Axios.post(baseUrl, accessTokenRequestBody);

      const userInfoRequestBody = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      // access token으로 user info 받아오기
      const { data } = await Axios.get(goolgeUserInfoApiUrl, userInfoRequestBody);

      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
