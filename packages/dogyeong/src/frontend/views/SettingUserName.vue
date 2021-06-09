<template>
  <Layout>
    <Header>
      <HeaderTitle>이름 변경</HeaderTitle>
    </Header>
    <main>
      <input v-model="username" type="text" />
      <button @click="changeUserName">save</button>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { changeUserInfo } from '@/services/authService';

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
        .then(() => this.$router.replace('/setting'))
        .catch(console.error);
    },
  },
});
</script>

<style lang="scss" scoped>
main {
  padding: 12px;

  input {
    margin-right: 8px;
    padding: 4px 8px;
  }

  button {
    padding: 4px 8px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
}
</style>
