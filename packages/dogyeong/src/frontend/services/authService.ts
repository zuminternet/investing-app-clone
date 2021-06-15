import { AxiosStatic } from 'axios';
import { apiEndpoints, googleAuthHeader } from '@/config';

declare const Axios: AxiosStatic;

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps extends LoginProps {
  name: string;
}

interface ChangeUserInfoProps {
  name?: string;
  password?: string;
}

interface User {
  user: {
    name: string;
    isGoogleUser: boolean;
  };
}

export const signup = async ({ name, email, password }: SignupProps) => {
  return Axios.post(apiEndpoints.signup, { name, email, password });
};

export const login = async ({ email, password }: LoginProps) => {
  const { data } = await Axios.post<User>(apiEndpoints.login, { email, password });
  return data;
};

export const googleLogin = async (code: string) => {
  const { data } = await Axios.get<User>(apiEndpoints.googleLogin, {
    headers: { [googleAuthHeader]: code },
  });
  return data;
};

export const fetchUser = async () => {
  const { data } = await Axios.get<User>(apiEndpoints.fetchUser);
  return data;
};

export const logout = async () => {
  return Axios.get(apiEndpoints.logout);
};

export const changeUserInfo = ({ name, password }: ChangeUserInfoProps = {}) => {
  return Axios.put(apiEndpoints.changeUserInfo, {
    name,
    password,
  });
};
