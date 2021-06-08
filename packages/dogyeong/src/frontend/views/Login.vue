<template>
  <Layout>
    <header>
      <RouterLink to="/">건너뛰기</RouterLink><img src="https://i-invdn-com.investing.com/logos/investing-com-logo.png" />
    </header>
    <main class="login-wrapper">
      <div class="form-wrapper">
        <form>
          <input v-model="email" type="email" placeholder="email" />
          <input v-model="password" type="password" placeholder="password" />
          <button type="submit" @click.prevent="onClickLogin">login</button>
        </form>
        <button class="google-btn" @click="onClickGoogleLogin">
          <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png?hl=ko" />
        </button>
        <RouterLink to="/signup">sign up</RouterLink>
      </div>
    </main>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Layout from '@/components/Layout/Layout.vue';

export default Vue.extend({
  name: 'Login',

  components: { Layout },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['login', 'googleLogin']),

    onClickLogin() {
      this.login({ email: this.email, password: this.password })
        .then(this.routeHome.bind(this))
        .catch((e) => window.alert(e?.response?.data ?? e?.message));
    },
    onClickGoogleLogin() {
      this.googleLogin()
        .then(this.routeHome.bind(this))
        .catch((e) => window.alert(e?.response?.data ?? e?.error ?? e));
    },
    routeHome() {
      this.$router.replace('/');
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  padding: 24px 12px;
  text-align: center;
  background-color: var(--login-header-color);

  a {
    font-size: 1rem;
    color: var(--primary-color);
    position: absolute;
    left: 12px;
    line-height: 35px;
  }
}

.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .form-wrapper {
    position: relative;
    text-align: center;
    top: 30%;
    max-width: 360px;
    margin: auto;

    form {
      display: flex;
      flex-direction: column;
      margin-bottom: 36px;

      input {
        margin-bottom: 12px;
        padding: 8px;
        font-size: 1rem;
        border-radius: 4px;
        border: 1px solid var(--border-color);
      }

      button {
        display: block;
        padding: 8px;
        background-color: var(--primary-color);
        font-size: 1rem;
        border-radius: 4px;
        color: var(--login-text-color);
      }
    }
  }

  .google-btn {
    display: block;
    margin: auto;
    margin-bottom: 12px;
  }
}
</style>
