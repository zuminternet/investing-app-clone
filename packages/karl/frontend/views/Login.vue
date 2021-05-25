<template>
  <div class="login-page">
    <div class="swiper-box">
      <login-swiper></login-swiper>
    </div>
    <div class="oauth-buttons-box">
      <o-auth-button>{{ facebookLogin }}</o-auth-button>
      <o-auth-button>{{ googleLogin }}</o-auth-button>
      <text-button @handle-button-click="routeToSignup">{{ emailSignup }}</text-button>
      <div class="normal-login-box">
        <custom-text>{{ alreadyRegister }}</custom-text>
        <text-button>{{ signIn }}</text-button>
      </div>
      <text-button @handle-button-click="routeToHome">{{ passWithoutLogin }}</text-button>
    </div>
  </div>
</template>

<script>
import OAuthButton from '../components/OAuthButton.vue';
import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import LoginSwiper from '../components/LoginSwiper.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Login',
  components: {
    OAuthButton,
    TextButton,
    CustomText,
    LoginSwiper,
  },

  data: function() {
    const { FACEBOOK_LOGIN, GOOGLE_LOGIN, EMAIL_SIGNUP, ALREADY_REGISTER, SIGN_IN, PASS_WITHOUT_LOGIN } = text;
    return {
      facebookLogin: FACEBOOK_LOGIN,
      googleLogin: GOOGLE_LOGIN,
      emailSignup: EMAIL_SIGNUP,
      alreadyRegister: ALREADY_REGISTER,
      signIn: SIGN_IN,
      passWithoutLogin: PASS_WITHOUT_LOGIN,
    };
  },

  methods: {
    routeToHome() {
      this.$router.push('/home');
    },

    routeToSignup() {
      this.$router.push('/signup');
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
}

.oauth-buttons-box {
  display: flex;
  width: 80%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.normal-login-box {
  display: flex;
  align-items: center;
}

.swiper-box {
  display: flex;
  flex: 1;
  background-color: blue;
  width: 100%;
}
</style>
