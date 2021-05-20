<template>
  <div class="area" :class="isDark">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    isDark() {
      // return this.isDark ? 'dark' : null;
      return null;
    },
  },
};
</script>

<style lang="scss">
html {
  @extend .center;

  body {
    @extend .reset;

    max-width: $max-width-mobile;
    height: 100vh;
    background-color: $grey-100;

    font-family: -apple-system, 'Helvetica Neue', 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.dark {
  background-color: $grey-700;
}
</style>
