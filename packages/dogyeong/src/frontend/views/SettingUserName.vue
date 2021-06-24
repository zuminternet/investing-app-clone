<template>
  <Layout>
    <Header>
      <HeaderTitle>이름 변경</HeaderTitle>
    </Header>
    <main :class="$style.main">
      <input v-model="username" type="text" />
      <button @click="changeUserName">저장</button>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * SettingUserName
 *
 * 회원정보변경(이름변경) 페이지
 */
import Vue from 'vue';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { changeUserInfo } from '@/services/authService';
import { routePaths } from '@/config';

export default Vue.extend({
  name: 'SettingUserName',

  components: { BottomNav, Layout, Header, HeaderTitle },

  data() {
    return {
      username: this.$store.state.user.user?.name ?? '',
    };
  },

  methods: {
    changeUserName() {
      changeUserInfo({ name: this.username })
        .then(() => this.$store.dispatch('fetchCurrentUser'))
        .then(() => this.$router.replace(routePaths.setting))
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
