<template>
  <div id="login-page">
    <div class="swiper-box">
      <login-swiper></login-swiper>
    </div>
    <div class="oauth-buttons-box">
      <o-auth-button :message="facebookLogin"></o-auth-button>
      <o-auth-button :message="googleLogin"></o-auth-button>
      <text-button :message="emailLogin"></text-button>
      <div class="normal-login-box">
        <custom-text>{{ alreadyRegister }}</custom-text>
        <text-button :message="signIn"></text-button>
      </div>
      <text-button :message="passWithoutLogin" @handle-button-click="routeToHome"></text-button>
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
    return {
      facebookLogin: text.FACEBOOK_LOGIN,
      googleLogin: text.GOOGLE_LOGIN,
      emailLogin: text.EMAIL_LOGIN,
      alreadyRegister: text.ALREADY_REGISTER,
      signIn: text.SIGN_IN,
      passWithoutLogin: text.PASS_WITHOUT_LOGIN,
    };
  },

  methods: {
    routeToHome() {
      this.$router.push('/home');
    },
  },
};
</script>

<style>
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
