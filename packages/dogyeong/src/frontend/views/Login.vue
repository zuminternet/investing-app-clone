<template>
  <div class="login-wrapper">
    <HeaderBar>로그인</HeaderBar>
    <div class="form-wrapper">
      <router-link to="/">to home</router-link><br />
      <button @click="onClickLoginBtn">Google</button>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Axios from 'axios';

const GOOGLE_AUTH_OPTIONS = {
  prompt: 'select_account',
};

export default {
  name: 'Login',
  components: { HeaderBar },
  methods: {
    async onClickLoginBtn() {
      const gapi = window.gapi;

      try {
        const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(GOOGLE_AUTH_OPTIONS);

        const { data } = await Axios.get('/api/auth/google', {
          headers: { INV_GOOGLE_AUTH: code },
        });

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
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
