<template>
  <div class="login-wrapper">
    <HeaderBar>로그인</HeaderBar>
    <div class="form-wrapper">
      <form>
        <input v-model="email" type="email" />
        <input v-model="password" type="password" />
        <button type="submit" @click.prevent="onClickLoginBtn">login</button>
      </form>
      <RouterLink to="/">to home</RouterLink><br />
      <button @click="onClickGoogleLoginBtn">Google</button>
      <RouterLink to="/signup">sign up</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from 'axios';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';

const GOOGLE_AUTH_OPTIONS = {
  prompt: 'select_account',
};

export default Vue.extend({
  name: 'Login',

  components: { HeaderBar },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async onClickGoogleLoginBtn() {
      const gapi = (window as any).gapi;

      try {
        const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(GOOGLE_AUTH_OPTIONS);

        const {
          data: { user },
        } = await Axios.get('/api/auth/google', {
          headers: { INV_GOOGLE_AUTH: code },
        });

        this.$store.commit('setUser', user.name);
      } catch (e) {
        console.error(e);
      }
    },
    async onClickLoginBtn() {
      Axios.post('/api/auth', {
        email: this.email,
        password: this.password,
      })
        .then(({ data: { user } }) => this.$store.commit('setUser', user.name))
        .catch(console.error);
    },
  },
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .form-wrapper {
    position: relative;
    text-align: center;
    top: 30%;
  }
}
</style>
