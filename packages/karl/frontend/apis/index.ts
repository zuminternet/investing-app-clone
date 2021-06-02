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

export interface loginUserByGoogleOAuthInfo {
  email: String;
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
        ? { googleId, email }
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

const createArticles = async ({ articles }) => {
  try {
    const result = await Axios.post(`${devURL}/api/articles`, {
      articles,
    });
    if (result) {
      return result;
    }
    throw new Error('Articles were not created');
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

/**
 * @description email과 googleId를 받아서 로그인을 요청하는 front-side API call 함수
 * @param param0
 * @returns
 */

const loginUserByGoogleOAuth = async ({ email, googleId }: loginUserByGoogleOAuthInfo) => {
  try {
    const reuslt = await Axios.post(`${devURL}/api/auth/google-oauth`, {
      email,
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

/**
 * @description home page 렌더링에 필요한 stock들을 가져오는 front-side API 호출 함수
 * @returns
 */
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

/**
 * @description home page 렌더링에 필요한 indices를 가져오는 front-side API 호출 함수
 */
const getIndices = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description home page 렌더링에 필요한 cpyto currencies를 가져오는 front-side API 호출 함수
 */
const getCryptoCurrencies = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export {
  createUser,
  loginUserByEmail,
  getUser,
  loginUserByGoogleOAuth,
  getStocks,
  getIndices,
  getCryptoCurrencies,
  createArticles,
};
