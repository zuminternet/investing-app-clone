<template>
  <div class="login-page">
    <template v-if="isEmailLogin">
      <o-auth-buttons-box :handleAuthClick="handleAuthClick"></o-auth-buttons-box>

      <div class="email-login-input-form-box">
        <login-password-input-form
          :submitButtonText="emailLogin"
          @handle-submit="submitForEmailLogin"
        ></login-password-input-form>
        <text-button @handle-button-click="routeToSignup">{{ register }}</text-button>
      </div>
    </template>
    <template v-else>
      <div class="swiper-box">
        <login-swiper></login-swiper>
      </div>
      <div class="login-wrapper">
        <o-auth-buttons-box :handleAuthClick="handleAuthClick"></o-auth-buttons-box>
        <div class="login-options-box">
          <text-button @handle-button-click="routeToSignup">{{ emailSignup }}</text-button>
          <div>
            <custom-text>{{ alreadyRegister }}</custom-text>
            <text-button @handle-button-click="changeToEmailLogin">{{ signIn }}</text-button>
          </div>
        </div>
        <text-button @handle-button-click="routeToHome">{{ passWithoutLogin }}</text-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex';

import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import LoginSwiper from '../components/LoginSwiper.vue';
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Login',
  components: {
    TextButton,
    CustomText,
    LoginSwiper,
    OAuthButtonsBox,
    LoginPasswordInputForm,
  },

  data() {
    const { EMAIL_SIGNUP, ALREADY_REGISTER, SIGN_IN, PASS_WITHOUT_LOGIN, EMAIL_LOGIN, REGISTER } = text;
    return {
      email: '',
      password: '',

      isEmailLogin: false,
      emailSignup: EMAIL_SIGNUP,
      alreadyRegister: ALREADY_REGISTER,
      signIn: SIGN_IN,
      passWithoutLogin: PASS_WITHOUT_LOGIN,
      emailLogin: EMAIL_LOGIN,
      register: REGISTER,

      user: null,
      isAuthorized: false,
      currentApiRequest: {},
      googleAuth: null,
    };
  },

  computed: {
    ...mapState({
      isAuthorizedByOAuth: (state) => state.user.isAuthorizedByOAuth,
    }),
  },

  methods: {
    ...mapActions('user', ['googleInitClient', 'getUser', 'requestEmailLogin', 'checkSignInOrSignOut']),

    handleAuthClick() {
      this.checkSignInOrSignOut();
    },

    changeToEmailLogin() {
      this.isEmailLogin = true;
    },

    routeToHome() {
      this.$router.push('/home');
    },

    routeToSignup() {
      this.$router.push('/signup');
    },

    async submitForEmailLogin(event) {
      if (await this.requestEmailLogin(event)) {
        this.routeToHome();
      }
    },
  },

  async mounted() {
    if (await this.getUser()) {
      this.routeToHome();

      return;
    }

    const gapi = window.gapi;
    gapi.load('client:auth2', this.googleInitClient);
  },

  watch: {
    isAuthorizedByOAuth(value) {
      if (value) {
        this.routeToHome();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.email-login-input-form-box {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}

.login-options-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper-box {
  display: flex;
  flex: 1;
  background-color: blue;
  width: 100%;
}
</style>
