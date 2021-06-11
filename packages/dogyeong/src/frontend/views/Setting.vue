<template>
  <Layout>
    <Header>
      <HeaderTitle>{{ headerTtile }}</HeaderTitle>
    </Header>
    <main>
      <div class="setting-item">
        <label> <input v-model="isDark" type="checkbox" /> 어두운 테마 </label>
      </div>
      <button v-if="userName" class="setting-item" @click="logout">로그아웃</button>
      <RouterLink v-else to="/login" class="setting-item">로그인</RouterLink>
      <template v-if="userName">
        <RouterLink v-if="!isGoogleUser" to="/change-password" class="setting-item">비밀번호 변경</RouterLink>
        <RouterLink to="/change-username" class="setting-item">이름 변경</RouterLink>
      </template>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'Setting',

  components: { BottomNav, Layout, Header, HeaderTitle },

  computed: {
    ...mapState(['user']),

    isDark: {
      get() {
        return this.$store.state.isDarkTheme;
      },
      set(isDark) {
        this.changeTheme(isDark);
      },
    },
    userName() {
      return this.user.user?.name;
    },
    isGoogleUser() {
      return this.user.user?.isGoogleUser;
    },
    headerTtile() {
      return this.userName ?? '로그인 해주세요';
    },
  },

  methods: {
    ...mapMutations(['changeTheme']),
    ...mapActions(['logout']),
  },
});
</script>

<style lang="scss" scoped>
main {
  .setting-item {
    padding: 18px 12px;
    border-bottom: 1px solid var(--border-color);
    display: block;
    width: 100%;
    text-align: left;
    font-size: 16px;
    color: var(--text-color);
  }
}
</style>
