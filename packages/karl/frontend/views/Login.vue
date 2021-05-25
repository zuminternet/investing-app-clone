<template>
  <div class="login-page">
    <template v-if="isEmailLogin">
      <div class="email-login-oauth-buttons-box">
        <o-auth-button>{{ facebookLogin }}</o-auth-button>
        <o-auth-button>{{ googleLogin }}</o-auth-button>
      </div>
      <div class="email-login-input-form-box">
        <form class="email-login-input-form" @submit="submitForEmailLogin">
          <input class="email-login-input" :placeholder="emailText" v-model="email" />
          <input class="email-login-input" :placeholder="passwordText" v-model="password" />
          <input class="email-login-submit" type="submit" :value="emailLogin" />
        </form>
        <text-button @handle-button-click="routeToSignup">{{ register }}</text-button>
      </div>
    </template>
    <template v-else>
      <div class="swiper-box">
        <login-swiper></login-swiper>
      </div>
      <div class="oauth-buttons-box">
        <o-auth-button>{{ facebookLogin }}</o-auth-button>
        <o-auth-button>{{ googleLogin }}</o-auth-button>
        <text-button @handle-button-click="routeToSignup">{{ emailSignup }}</text-button>
        <div class="normal-login-box">
          <custom-text>{{ alreadyRegister }}</custom-text>
          <text-button @handle-button-click="changeToEmailLogin">{{ signIn }}</text-button>
        </div>
        <text-button @handle-button-click="routeToHome">{{ passWithoutLogin }}</text-button>
      </div>
    </template>
  </div>
</template>

<script>
import OAuthButton from '../components/OAuthButton.vue';
import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import LoginSwiper from '../components/LoginSwiper.vue';

import { text } from '../../../common/frontend/constants';
import { createUser, loginUserByEmail, getUser } from '../apis';

export default {
  name: 'Login',
  components: {
    OAuthButton,
    TextButton,
    CustomText,
    LoginSwiper,
  },

  data: function() {
    const {
      FACEBOOK_LOGIN,
      GOOGLE_LOGIN,
      EMAIL_SIGNUP,
      ALREADY_REGISTER,
      SIGN_IN,
      PASS_WITHOUT_LOGIN,
      EMAIL,
      PASSWORD,
      EMAIL_LOGIN,
      REGISTER,
    } = text;
    return {
      email: '',
      password: '',

      isEmailLogin: false,
      facebookLogin: FACEBOOK_LOGIN,
      googleLogin: GOOGLE_LOGIN,
      emailSignup: EMAIL_SIGNUP,
      alreadyRegister: ALREADY_REGISTER,
      signIn: SIGN_IN,
      passWithoutLogin: PASS_WITHOUT_LOGIN,
      emailText: EMAIL,
      passwordText: PASSWORD,
      emailLogin: EMAIL_LOGIN,
      register: REGISTER,
    };
  },

  methods: {
    changeToEmailLogin() {
      this.isEmailLogin = true;
    },

    routeToHome() {
      this.$router.push('/home');
    },

    routeToSignup() {
      this.$router.push('/signup');
    },

    submitForEmailLogin: async function(event) {
      try {
        event.preventDefault();

        const result = await loginUserByEmail({ email: this.email, password: this.password });

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

  beforeCreate() {
    getUser().then((user) => {
      if (user) {
        console.log(user);
        this.routeToHome();
      }
    });
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

.email-login-oauth-buttons-box {
  display: flex;
  width: 80%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.email-login-input-form {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}

.email-login-input-form-box {
  display: flex;
  width: 80%;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.email-login-input {
  margin-top: 5px;
}

.email-login-submit {
  margin-top: 10px;
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
