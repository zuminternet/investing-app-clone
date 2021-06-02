import { googleAuthInitConfig } from '../../configs';
import { getUser, loginUserByEmail, loginUserByGoogleOAuth, createUser } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  userName: '',
  userEmail: '',
  userBookmark: [],
  isAuthorizedByOAuth: false,
});

// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.stockItems, state.indexItems, state.cryptoItems];
  },
};

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
  checkSignInOrSignOut({ dispatch }) {
    if (googleAuth.isSignedIn.get()) {
      dispatch('loginUserByGoogleOAuthOrCreateUser');
    } else {
      googleAuth.signIn();
    }
  },

  /**
   *
   * @description OAuth flow action. googleAuth 객체를 이용해 signIn 여부를 감지한다.
   *
   */
  async googleInitClient({ dispatch }) {
    await gapi.client.init(googleAuthInitConfig);
    googleAuth = gapi.auth2.getAuthInstance();
    googleUser = googleAuth.currentUser.get();

    googleAuth.isSignedIn.listen(async (isSignedIn) => {
      googleUser = googleAuth.currentUser.get();

      if (isSignedIn) {
        dispatch('loginUserByGoogleOAuthOrCreateUser');
      }
    });
  },

  /**
   *
   * @description googleId를 사용해 서버에서 사용자를 찾아 로그인하거나 사용자를 등록하는 action,
   */
  async loginUserByGoogleOAuthOrCreateUser({ commit }) {
    const googleId = googleUser.Aa;
    const email = googleUser.Ft.pu;
    // email 위치 googleUser.Ft.pu

    let result = await loginUserByGoogleOAuth({ email, googleId });

    if (result) {
      commit('changeIsAuthorizedByOAuth', true);

      return;
    }

    result = await createUser({ email, googleId });

    if (result) {
      result = await loginUserByGoogleOAuth({ email, googleId });
      commit('changeIsAuthorizedByOAuth', true);

      return;
    }
  },

  /**
   *
   * @description JWT를 이용하여 자동로그인을 수행하는 action. 성공하면 유저 정보를 가져온다.
   *
   */
  async getUser() {
    try {
      const user = await getUser();

      if (user) {
        return true;
      }

      throw new Error('Getting user was failed in user store');
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
      const result = await loginUserByEmail({ email, password });

      if (result.status === 200) {
        return true;
      }

      throw new Error('invalid user');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  changeIsAuthorizedByOAuth(state, judge) {
    state.isAuthorizedByOAuth = judge;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
