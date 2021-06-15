<template>
  <div class="login-page">
    <template v-if="isEmailLogin">
      <o-auth-buttons-box :handleAuthClick="handleAuthClick" />
      <div class="email-login-input-form-box">
        <login-password-input-form
          :submitButtonText="emailLogin"
          @handle-submit="submitForEmailLogin"
        ></login-password-input-form>
        <text-button @handle-button-click="routeToSignup">
          <custom-text loginButtonText>{{ register }}</custom-text>
        </text-button>
      </div>
    </template>
    <template v-else>
      <div class="zum-logo-box">
        <div class="zum-logo"></div>
      </div>
      <div class="login-wrapper">
        <o-auth-buttons-box :handleAuthClick="handleAuthClick"></o-auth-buttons-box>
        <div class="login-options-box">
          <text-button @handle-button-click="routeToSignup">
            <custom-text loginButtonText>{{ emailSignup }}</custom-text>
          </text-button>
          <div>
            <custom-text>{{ alreadyRegister }}</custom-text>
            <text-button @handle-button-click="changeToEmailLogin"
              ><custom-text loginButtonText>{{ signIn }}</custom-text></text-button
            >
          </div>
        </div>
        <text-button @handle-button-click="routeToMarket"
          ><custom-text loginButtonText> {{ passWithoutLogin }} </custom-text></text-button
        >
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'vuex';

import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Login',
  components: {
    TextButton,
    CustomText,
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

    routeToMarket() {
      this.$router.push('market');
    },

    routeToSignup() {
      this.$router.push('signup');
    },

    async submitForEmailLogin(event) {
      if (await this.requestEmailLogin(event)) {
        this.routeToMarket();
      }
    },
  },

  async created() {
    if (await this.getUser()) {
      this.routeToMarket();

      return;
    }

    const gapi = window.gapi;
    gapi.load('client:auth2', this.googleInitClient);
  },

  watch: {
    isAuthorizedByOAuth(value) {
      if (value) {
        this.routeToMarket();
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
  flex: 4;
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
  margin-top: 30px;
}

.zum-logo-box {
  display: flex;
  flex: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}

.zum-logo {
  background: url(https://zum.com/static/img/spr_common_2x.593ccf3c.png) 0 0 no-repeat;
  background-size: 250px 250px;
  width: 120px;
  height: 40px;
}
</style>
