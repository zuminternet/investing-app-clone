<template>
  <loading v-if="isLoading">></loading>
  <error v-else-if="isError"></error>
  <div v-else class="signup-page">
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

import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';
import OAuthButtonsBox from '../components/OAuthButtonsBox.vue';
import LoginPasswordInputForm from '../components/LoginPasswordInputForm.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Signup',
  components: { OAuthButtonsBox, LoginPasswordInputForm, Loading, Error },

  data() {
    const { EMAIL_REGISTER } = text;

    return {
      emailRegister: EMAIL_REGISTER,
    };
  },

  computed: {
    ...mapState({
      isAuthorizedByOAuth: (state) => state.user.isAuthorizedByOAuth,
      isLoading: (state) => state.user.isLoading,
      isError: (state) => state.user.isError,
    }),
  },

  methods: {
    ...mapActions('user', ['checkSignInOrSignOut', 'createUserByEmail', 'setIsLoading']),

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
      this.setIsLoading(true);
      if (await this.createUserByEmail(event)) {
        this.routerToLogin();
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

  mounted() {
    this.setIsLoading(false);
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
