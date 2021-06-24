<template>
  <Layout>
    <Header>
      <HeaderTitle>계정 생성</HeaderTitle>
    </Header>
    <main>
      <form :class="$style.form">
        <input v-model="name" type="text" placeholder="name" :class="$style.input" />
        <input v-model="email" type="email" placeholder="email" :class="$style.input" />
        <input v-model="password" type="password" placeholder="password" :class="$style.input" />
        <button type="submit" :class="$style.button" @click.prevent="onClickSignupBtn">sign up</button>
      </form>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * Signup
 *
 * 회원가입 페이지
 */
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import * as authService from '@/services/authService';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import { routePaths } from '@/config';

export default Vue.extend({
  name: 'Signup',

  components: {
    BottomNav,
    Layout,
    Header,
    HeaderTitle,
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },

  methods: {
    onClickSignupBtn() {
      authService
        .signup({
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          window.alert('계정이 생성되었습니다.');
          this.$router.replace(routePaths.login);
        })
        .catch(window.alert);
    },
  },
});
</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  max-width: 350px;
  margin: auto;
}

.input {
  margin-bottom: 12px;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.button {
  display: block;
  padding: 8px;
  background-color: var(--primary-color);
  font-size: 1rem;
  border-radius: 4px;
  color: var(--login-text-color);
}
</style>
