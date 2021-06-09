<template>
  <div id="app" :class="{ dark: $store.state.isDarkTheme }">
    <div class="wrapper">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts">
/*
 **********************************************************
 *
 *    줌 프론트엔드 신규입사자 파일럿 프로젝트 엔트리 컴포넌트
 *
 **********************************************************
 */
import Vue from 'vue';
import { googleAuthInitConfig } from '@/config';

export default Vue.extend({
  name: 'App',

  async created() {
    this.initGoogleApi();
    await this.$store.dispatch('fetchCurrentUser');
    if (!this.$store.state.user.user) this.$router.push('/login');
  },

  methods: {
    initGoogleApi() {
      const { lib, args } = googleAuthInitConfig;
      const gapi = window.gapi;
      gapi.load(lib, () => gapi.auth2.init(args));
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/index.scss';

#app {
  background-color: var(--app-bg-color);
  overflow: hidden;

  .wrapper {
    width: 100%;
    height: 100%;
    max-width: var(--app-width);
    margin: auto;
    background-color: var(--bg-color);
    position: relative;
  }
}
</style>
