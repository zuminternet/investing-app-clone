<template>
  <div class="signup-page">
    <o-auth-buttons-box></o-auth-buttons-box>
    <login-password-input-form
      :submitButtonText="emailRegister"
      :isRegister="true"
      @handle-submit="submitForEmailRegister"
    ></login-password-input-form>
  </div>
</template>

<script lang="ts">
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { createUser } from '../apis';
import { text } from '../../../common/frontend/constants';

export default {
  name: 'Signup',
  components: { OAuthButtonsBox, LoginPasswordInputForm },

  data() {
    const { EMAIL_REGISTER } = text;

    return {
      emailRegister: EMAIL_REGISTER,
    };
  },

  methods: {
    routeToHome() {
      this.$router.push('/home');
    },

    routerToLogin() {
      this.$router.push('/');
    },

    async submitForEmailRegister(event) {
      try {
        console.log(event);
        const { name, email, password } = event.$data;
        console.log(name, email, password);
        const result = await createUser({ name, email, password });

        if (result.status === 200) {
          this.routerToLogin();

          // 여기에 이후 dispatch 문이 들어감
          return;
        }

        throw new Error('invalid register request');
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scope lang="scss">
.signup-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
