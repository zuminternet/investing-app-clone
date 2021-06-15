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

export interface getHistoricalDataInfo {
  symbol: string;
  from: string;
  to: string;
  period: string;
}

const createUser = async ({ name, email, password, googleId }: createUserInfo) => {
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

  if (result.status === 201) {
    return true;
  }

  throw new Error('User was not created');
};

// const createArticles = async ({ articles }) => {
//   try {
//     const result = await Axios.post(`${devURL}/api/articles`, {
//       articles,
//     });

//     if (result.status === 201) {
//       return true;
//     }
//     throw new Error('Articles were not created');
//   } catch (error) {
//     console.log(error);
//   }
// };

const getUser = async () => {
  const result = await Axios.get(`${devURL}/api/user`, { withCredentials: true });

  if (result.status === 200) {
    const { data: user } = result;

    return user;
  }

  throw new Error('Getting user was failed in front api');
};

const loginUserByEmail = async ({ email, password }: loginUserByEmailInfo) => {
  const result = await Axios.post(`${devURL}/api/auth/email`, {
    email,
    password,
  });

  if (result.status === 200) {
    const { data: user } = result;

    return user;
  }

  throw new Error('Email login was failed in front api');
};

/**
 * @description email과 googleId를 받아서 로그인을 요청하는 front-side API call 함수
 * @param param0
 * @returns
 */

const loginUserByGoogleOAuth = async ({ email, googleId }: loginUserByGoogleOAuthInfo) => {
  const result = await Axios.post(`${devURL}/api/auth/google-oauth`, {
    email,
    googleId,
  });

  if (result.status === 200) {
    const { data: user } = result;

    return user;
  }

  throw new Error('OAuth login was failed in front api');
};

/**
 * @description home page 렌더링에 필요한 stock들을 가져오는 front-side API 호출 함수
 * @returns
 */
const getStocks = async () => {
  const result = await Axios.get(`${devURL}/api/market/stock`);

  if (result.status === 200) {
    const { data: stocks } = result;

    return stocks;
  }

  throw new Error('Getting stocks was failed in front api');
};

/**
 * @description home page 렌더링에 필요한 indices를 가져오는 front-side API 호출 함수
 */
const getIndices = async () => {
  const result = await Axios.get(`${devURL}/api/market/indices`);

  if (result.status === 200) {
    const { data: indices } = result;

    return indices;
  }

  throw new Error('Getting indices was failed in front api');
};

/**
 * @description home page 렌더링에 필요한 cpyto currencies를 가져오는 front-side API 호출 함수
 */
const getCryptos = async () => {
  const result = await Axios.get(`${devURL}/api/market/cryptos`);

  if (result.status === 200) {
    const { data: cryptos } = result;

    return cryptos;
  }

  throw new Error('Getting cryptos was failed in front api');
};

const getHistoricalData = async ({ symbol, from, to, period }: getHistoricalDataInfo) => {
  const result = await Axios.get(`${devURL}/api/chart/historical`, {
    params: {
      symbol,
      from,
      to,
      period,
    },
  });

  if (result.status === 200) {
    const { data } = result;

    return data;
  }

  throw new Error('Getting Historical data was failed in front api');
};

export {
  createUser,
  loginUserByEmail,
  getUser,
  loginUserByGoogleOAuth,
  getStocks,
  getIndices,
  // createArticles,
  getCryptos,
  getHistoricalData,
};
