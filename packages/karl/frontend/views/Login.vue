<template>
  <div class="login-page">
    <template v-if="isEmailLogin">
      <o-auth-buttons-box :handleAuthClick="handleAuthClick.bind(this)"></o-auth-buttons-box>

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
        <o-auth-buttons-box :handleAuthClick="handleAuthClick.bind(this)"></o-auth-buttons-box>
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

<script>
import { mapActions } from 'vuex';

import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import LoginSwiper from '../components/LoginSwiper.vue';
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { googleAuthInitConfig } from '../configs';
import { text } from '../../../common/frontend/constants';
import { getUser, loginUserByEmail } from '../apis';

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

  methods: {
    ...mapActions('user', ['getUser']),
    handleClientLoad() {
      gapi.load('client:auth2', this.googleInitClient);
    },

    handleAuthClick() {
      if (this.googleAuth.isSignedIn.get()) {
        this.googleAuth.signOut();
      } else {
        this.googleAuth.signIn();
      }
    },

    sendAuthorizedApiRequest(requestDetails) {
      this.currentApiRequest = requestDetails;

      if (this.isAuthorized) {
        // gapi.client.request(requestDetails)

        this.currentApiRequest = {};
      } else {
        this.googleAuth.signIn();
      }
    },

    updateSigninStatus(isSignedIn) {
      console.log(isSignedIn, 'call isSignedIn');
      if (isSignedIn) {
        this.isAuthorized = true;

        console.log(this.user, 'login user');
        this.routeToHome();
      } else {
        this.isAuthorized = false;
        this.user = this.googleAuth.currentUser.get();

        console.log(this.user, 'logout user');
      }
    },

    googleInitClient() {
      let that = this;

      gapi.client.init(googleAuthInitConfig).then(function() {
        that.googleAuth = gapi.auth2.getAuthInstance();
        that.googleAuth.isSignedIn.listen(that.updateSigninStatus);

        that.user = that.googleAuth.currentUser.get();
        console.log(that.user, 'user');
        that.isAuthorized = that.user.hasGrantedScopes(googleAuthInitConfig.scope);
        console.log(that.isAuthorized);
      });
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
      try {
        const { email, password } = event.$data;
        const result = await loginUserByEmail({ email, password });

        if (result.status === 200) {
          this.routeToHome();

          // 여기에 이후 dispatch 문이 들어감
          return;
        }

        throw new Error('invalid user');
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },

  async mounted() {
    this.handleClientLoad();

    if (await this.getUser()) {
      this.routeToHome();
    }

    // this.googleInitClient();
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
