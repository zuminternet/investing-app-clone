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

export default {
  name: 'Login',
  components: { HeaderBar },
  methods: {
    onClickLoginBtn() {
      Axios.get('/api/auth')
        .then(({ data }) => (window.location = data.url))
        .catch(console.error);
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
