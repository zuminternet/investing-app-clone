<template>
  <div class="login-page">
    <template v-if="isEmailLogin">
      <o-auth-buttons-box></o-auth-buttons-box>
      <div class="email-login-input-form-box">
        <login-password-input-form></login-password-input-form>
        <text-button @handle-button-click="routeToSignup">{{ register }}</text-button>
      </div>
    </template>
    <template v-else>
      <div class="swiper-box">
        <login-swiper></login-swiper>
      </div>
      <div class="login-wrapper">
        <o-auth-buttons-box></o-auth-buttons-box>
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
import TextButton from '../components/TextButton.vue';
import CustomText from '../../../common/frontend/components/CustomText.vue';
import LoginSwiper from '../components/LoginSwiper.vue';
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { text } from '../../../common/frontend/constants';
import { loginUserByEmail, getUser } from '../apis';

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

    async submitForEmailLogin(event) {
      try {
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
