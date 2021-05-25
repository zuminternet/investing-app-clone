import { AxiosStatic } from 'axios';
import { apiEndpoints, googleAuthHeader } from '@/config';

declare const axios: AxiosStatic;

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps extends LoginProps {
  name: string;
}

interface User {
  user: {
    name: string;
  };
}

export const signup = async ({ name, email, password }: SignupProps) => {
  return axios.post(apiEndpoints.signup, { name, email, password });
};

export const login = async ({ email, password }: LoginProps): Promise<User> => {
  const { data } = await axios.post(apiEndpoints.login, { email, password });
  return data;
};

export const googleLogin = async (code: string): Promise<User> => {
  const { data } = await axios.get(apiEndpoints.googleLogin, {
    headers: { [googleAuthHeader]: code },
  });
  return data;
};

export const fetchUser = async (): Promise<User> => {
  const { data } = await axios.get(apiEndpoints.fetchUser);
  return data;
};

export const logout = async () => {
  return axios.get(apiEndpoints.logout);
};
