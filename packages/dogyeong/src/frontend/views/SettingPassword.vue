<template>
  <Layout>
    <Header>
      <HeaderTitle>비밀번호 변경</HeaderTitle>
    </Header>
    <main :class="$style.main">
      <input v-model="password" type="password" />
      <button @click="changeUserName">save</button>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * SettingPassword
 *
 * 회원정보변경(비밀번호변경) 페이지
 */
import Vue from 'vue';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { changeUserInfo } from '@/services/authService';

export default Vue.extend({
  name: 'SettingPassword',

  components: { BottomNav, Layout, Header, HeaderTitle },

  data() {
    return {
      password: '',
    };
  },

  methods: {
    changeUserName() {
      changeUserInfo({ password: this.password })
        .then(() => this.$store.dispatch('fetchCurrentUser'))
        .then(() => this.$router.replace('/setting'))
        .catch(window.alert);
    },
  },
});
</script>

<style lang="scss" module>
.main {
  padding: 12px;

  input {
    margin-right: 8px;
    padding: 4px 8px;
    background-color: var(--header-nav-bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
  }

  button {
    padding: 4px 8px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
  }
}
</style>
