import axios from 'axios';
import { apiEndpoints, googleAuthHeader } from '@/config';

export const signup = async ({ name, email, password }) => {
  return axios.post(apiEndpoints.signup, { name, email, password });
};

export const login = async ({ email, password }) => {
  const { data } = await axios.post(apiEndpoints.login, { email, password });
  return data;
};

export const googleLogin = async (code) => {
  const { data } = await axios.get(apiEndpoints.googleLogin, {
    headers: { [googleAuthHeader]: code },
  });
  return data;
};

export const fetchUser = async () => {
  const { data } = await axios.get(apiEndpoints.fetchUser);
  return data;
};

export const logout = async () => {
  return axios.get(apiEndpoints.logout);
};
