import { googleAuthInitConfig } from '../../configs';
import { getUser, loginUserByEmail, loginUserByGoogleOAuth, createUser } from '../../apis';
import { getBookmarks } from '../../../../common/frontend/apis';

// 초기 state 값 설정
const state = () => ({
  userEmail: '',
  userGoogleId: '',
  userBookmarks: [],
  isAuthorizedByOAuth: false,
  isLoading: false,
  isError: false,
});

// getter 설정

const getters = {};

// google OAuth에 필요한 객체
let googleAuth = null;
let googleUser = null;

// actions 설정
const actions = {
  /**
   * @author karl
   */

  /**
   *
   * @description signIn 여부에 따라 토큰을 재발급하거나 signIn 하도록하는 action.
   */
  checkSignInOrSignOut({ dispatch, commit }) {
    try {
      if (googleAuth.isSignedIn.get()) {
        dispatch('loginUserByGoogleOAuthOrCreateUser');
      } else {
        googleAuth.signIn();
      }
    } catch (error) {
      console.log(error);
      commit('setIsError', true);
    }
  },

  /**
   *
   * @description OAuth flow action. googleAuth 객체를 이용해 signIn 여부를 감지한다.
   *
   */
  async googleInitClient({ dispatch }) {
    try {
      await gapi.client.init(googleAuthInitConfig);
      googleAuth = gapi.auth2.getAuthInstance();
      googleUser = googleAuth.currentUser.get();

      googleAuth.isSignedIn.listen(async (isSignedIn) => {
        googleUser = googleAuth.currentUser.get();

        if (isSignedIn) {
          dispatch('loginUserByGoogleOAuthOrCreateUser');
        }
      });
    } catch (error) {
      console.log(error);
      commit('setIsError', true);
    }
  },

  /**
   *
   * @description googleId를 사용해 서버에서 사용자를 찾아 로그인하거나 사용자를 등록하는 action,
   */
  async loginUserByGoogleOAuthOrCreateUser({ commit }) {
    const googleId = googleUser.Aa;
    const email = googleUser.Ft.pu;

    let user = await loginUserByGoogleOAuth({ email, googleId });

    if (user) {
      commit('setIsAuthorizedByOAuth', true);
      commit('setUserInfo', user);

      return true;
    }

    if (await createUser({ email, googleId })) {
      user = await loginUserByGoogleOAuth({ email, googleId });

      if (user) {
        commit('setIsAuthorizedByOAuth', true);
        commit('setUserInfo', user);

        return true;
      }
    }

    throw new Error('Login by google OAuth or creating user was failed in user store ');
  },

  /**
   *
   * @description JWT를 이용하여 자동로그인을 수행하는 action. 성공하면 유저 정보를 가져온다.
   *
   */
  async getUser({ commit }) {
    try {
      const user = await getUser();

      if (user) {
        commit('setUserInfo', user);

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   *
   * @description 이메일 로그인을 요청하는 action. 성공시 서버로 부터 JWT가 담긴 쿠키를 받아오고 유저 정보를 가져온다.
   *
   */
  async requestEmailLogin({ commit }, event) {
    try {
      const { email, password } = event.$data;
      const user = await loginUserByEmail({ email, password });

      if (user) {
        commit('setUserInfo', user);

        return true;
      }
    } catch (error) {
      console.log(error);
      commit('setIsError', true);
    }
  },

  /**
   * @description email을 통해 user를 만드는 action
   * @param param0
   * @param event
   * @returns
   */
  async createUserByEmail({ commit }, event) {
    try {
      const { name, email, password } = event.$data;
      const isCreated = await createUser({ name, email, password });

      if (isCreated) {
        return true;
      }
    } catch (error) {
      console.log(error);
      commit('setIsError', true);
    }
  },

  async getBookmarks({ commit, state }) {
    try {
      const email = state.userEmail;
      const bookmarks = await getBookmarks(email);

      if (bookmarks) {
        commit('setBookmarks', bookmarks);

        return true;
      }
    } catch (error) {
      console.log(error);
      commit('setIsError', true);
    }
  },

  setIsLoading({ commit }, isLoading) {
    commit('setIsLoading', isLoading);
  },

  setIsError({ commit }, isError) {
    commit('setIsError', isError);
  },
};

// mutatuons 설정
const mutations = {
  /**
   * @description JWT를 통해 인증이 되었는지 판단하는 flag를 바꾸는 mutation
   * @param state
   * @param judge
   */
  setIsAuthorizedByOAuth(state, judge) {
    state.isAuthorizedByOAuth = judge;
  },

  setUserInfo(state, userInfo) {
    const { email, googleId } = userInfo;

    state.userEmail = email;
    state.userGoogleId = googleId;
  },

  setBookmarks(state, bookmarks) {
    state.userBookmarks = bookmarks;
  },

  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setIsError(state, isError) {
    state.isError = isError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
