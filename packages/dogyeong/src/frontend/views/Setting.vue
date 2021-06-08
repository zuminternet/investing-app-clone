<template>
  <Layout>
    <Header>
      <HeaderTitle>{{ headerTtile }}</HeaderTitle>
    </Header>
    <main>
      <div class="setting-item">
        <label> <input v-model="isDark" type="checkbox" /> 어두운 테마 </label>
      </div>
      <div v-if="!user" class="setting-item"><RouterLink to="/login">로그인</RouterLink></div>
      <div v-else @click="logout">로그아웃</div>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapActions } from 'vuex';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'Setting',

  components: { BottomNav, Layout, Header, HeaderTitle },

  computed: {
    isDark: {
      get() {
        return this.$store.state.isDarkTheme;
      },
      set(isDark) {
        this.changeTheme(isDark);
      },
    },
    user() {
      return this.$store.state.user.user;
    },
    headerTtile() {
      return this.user ?? '로그인 해주세요';
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
  div {
    padding: 18px 12px;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
