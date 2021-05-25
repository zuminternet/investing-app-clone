import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';
import { AxiosStatic } from 'axios';
import { GoogleUserInfo } from './UserService';

declare const axios: AxiosStatic;

@Service()
export default class AuthService {
  constructor(@Yml('oauthConfig') private OAuthConfig) {}

  /**
   * 사용자의 동의를 받고 얻은 코드로 사용자 정보를 받아와서 반환
   * @param code
   * @returns GoogleUserInfo | null
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
      } = await axios.post(baseUrl, accessTokenRequestBody);

      const userInfoRequestBody = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      // access token으로 user info 받아오기
      const { data } = await axios.get(goolgeUserInfoApiUrl, userInfoRequestBody);

      return data as GoogleUserInfo;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
