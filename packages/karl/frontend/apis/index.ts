import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

export interface createUserInfo {
  name: string;
  email: string;
  password: string;
  googleId: string;
}

export interface loginUserByEmailInfo {
  email: string;
  password: string;
}

export interface loginUserByOAuthInfo {
  googleId: string;
  password: string;
}

export interface loginUserByGoogleOAuthInfo {
  googleId: string;
}

export interface getSearchedItemsInfo {
  keyword: string;
}

const createUser = async ({ name, email, password, googleId }: createUserInfo) => {
  try {
    const result = await Axios.post(
      `${devURL}/api/user`,
      googleId
        ? { googleId }
        : {
            name,
            email,
            password,
          },
    );

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

    throw new Error('Getting user was failed in front api');
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

    throw new Error('Email login was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const loginUserByGoogleOAuth = async ({ googleId }: loginUserByGoogleOAuthInfo) => {
  try {
    const reuslt = await Axios.post(`${devURL}/api/auth/google-oauth`, {
      googleId,
    });

    if (reuslt) {
      return reuslt;
    }

    throw new Error('OAuth login was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const getStocks = async () => {
  try {
    const result = await Axios.get(`${devURL}/api/market/stock`);

    if (result) {
      return result;
    }

    throw new Error('Getting stocks was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

export { createUser, loginUserByEmail, getUser, loginUserByGoogleOAuth, getStocks };
