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
        <custom-text :message="alreadyRegister"></custom-text>
        <text-button :message="signIn"></text-button>
      </div>
      <text-button :message="passWithoutLogin" @handle-button-click="routeToHome"></text-button>

    </div>
  </div>
</template>

<script>
import OAuthButton from '../components/OAuthButton.vue'
import TextButton from '../components/TextButton.vue'
import CustomText from '../components/CustomText.vue'
import LoginSwiper from '../components/LoginSwiper.vue'
import { text } from '../constants'

export default {
  name: 'Login',
  components: {
    OAuthButton,
    TextButton,
    CustomText,
    LoginSwiper,

  },

  data: function () {
    return {
      facebookLogin: text.facebookLogin,
      googleLogin: text.googleLogin,
      emailLogin: text.emailLogin,
      alreadyRegister: text.alreadyRegister,
      signIn: text.signIn,
      passWithoutLogin: text.passWithoutLogin
    }
  },

  methods : {
    routeToHome() {
      this.$router.push('/home')

    }
  }
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
