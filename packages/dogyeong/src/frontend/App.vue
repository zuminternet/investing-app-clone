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

const GOOGLE_AUTH_PARAMS = {
  client_id: '266193407466-7qvkgbj34vr3k5dbf0o31gnsii3b78s4.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.profile',
  access_type: 'code',
};

export default Vue.extend({
  name: 'App',

  mounted() {
    const gapi = (window as any).gapi;
    gapi.load('auth2', () => gapi.auth2.init(GOOGLE_AUTH_PARAMS));
  },

  methods: {
    getCurrentUser() {},
  },
});
</script>

<style lang="scss" scoped>
#app {
  background-color: var(--app-bg-color);

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
