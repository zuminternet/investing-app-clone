import { SERVER_BASE_URL } from '../../../domain/apiUrls';
import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

export const login = async (email: string, password: string) => {
  try {
    const { status, statusText } = await Axios.post(`${SERVER_BASE_URL}/api/auth/in`, { email, password });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};

export const logout = async (email: string) => {
  try {
    const { status, statusText } = await Axios.get(`${SERVER_BASE_URL}/api/auth/out`, { params: { email } });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};
