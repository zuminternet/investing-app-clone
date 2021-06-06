<template>
  <Button @click.native="themeToggler" :class="color">{{ buttonTitle }}</Button>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '@/components/atoms/Button';
import { ThemeModule } from '@/store';
import { ThemeName } from '@/store/modules/theme';

export default Vue.extend({
  name: 'ThemeToggleButton',

  components: { Button },

  computed: {
    isDark() {
      return ThemeModule.theme === ThemeName.dark;
    },

    buttonTitle() {
      return `${this.isDark ? 'Dark🌟' : 'ZUM'} Theme`;
    },

    color() {
      return this.isDark ? '_dark' : '_light';
    },
  },

  methods: {
    themeToggler() {
      return ThemeModule.toggleTheme();
    },
  },
});
</script>

<style lang="scss" scoped>
$size: 50px;

button {
  position: fixed;
  width: $size;
  height: $size;
  right: 7%;
  bottom: 5%;
  font-size: 0.6rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  word-break: keep-all;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 0 0.2rem 0.1rem rgba($grey-700, 0.7);
}

._dark {
  background-color: $deep-dark;
  color: $neon-blurple;
}

._light {
  color: $blue-900;
  font-weight: 700;
}
</style>
