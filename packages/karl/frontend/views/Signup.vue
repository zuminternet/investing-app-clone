<template>
  <div class="signup-page">
    <o-auth-buttons-box :handleAuthClick="handleAuthClick"></o-auth-buttons-box>
    <login-password-input-form
      :submitButtonText="emailRegister"
      :isRegister="true"
      @handle-submit="submitForEmailRegister"
    ></login-password-input-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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

  computed: {
    ...mapState({
      isAuthorizedByOAuth: (state) => state.user.isAuthorizedByOAuth,
    }),
  },

  methods: {
    ...mapActions('user', ['checkSignInOrSignOut']),

    handleAuthClick() {
      this.checkSignInOrSignOut();
    },

    routeToMarket() {
      this.$router.push('market');
    },

    routerToLogin() {
      this.$router.push('/');
    },

    async submitForEmailRegister(event) {
      try {
        const { name, email, password } = event.$data;
        const result = await createUser({ name, email, password });

        if (result.status === 200) {
          this.routerToLogin();
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
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

<style scope lang="scss">
.signup-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
