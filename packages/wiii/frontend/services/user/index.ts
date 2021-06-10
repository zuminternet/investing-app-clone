import { SERVER_BASE_URL } from '../../../domain/apiUrls';
import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

export const login = async (email: string, password: string) => {
  try {
    const { status, statusText } = await Axios.post(`/api/auth/in`, { email, password }, { withCredentials: true });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};

export const logout = async (email: string) => {
  try {
    const { status, statusText } = await Axios.get(`/api/auth/out`, { params: { email } });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};

export const signup = async (email: string, password: string, nickname: string) => {
  try {
    const { status, statusText } = await Axios.post(`/api/user/`, { email, password, nickname }, { withCredentials: true });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};
