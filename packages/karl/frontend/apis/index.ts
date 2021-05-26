import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000/';

export interface createUserInfo {
  name: string;
  email: string;
  password: string;
}

export interface loginUserByEmailInfo {
  email: string;
  password: string;
}

const createUser = async ({ name, email, password }: createUserInfo) => {
  try {
    const result = await Axios.post(`${devURL}/api/user`, {
      name,
      email,
      password,
    });

    if (result) {
      return result;
    }

    throw new Error('User was not created');
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const result = await Axios.get(`${devURL}/api/user`, { withCredentials: true });

    if (result) {
      return result;
    }

    throw new Error('Getting user was failed ');
  } catch (error) {
    console.log(error);
  }
};

const loginUserByEmail = async ({ email, password }: loginUserByEmailInfo) => {
  try {
    const result = await Axios.post(`${devURL}/api/auth/email`, {
      email,
      password,
    });

    if (result) {
      return result;
    }

    throw new Error('Email login was failed');
  } catch (error) {
    console.log(error);
  }
};

export { createUser, loginUserByEmail, getUser };
