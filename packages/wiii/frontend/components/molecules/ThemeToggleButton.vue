<template>
  <Button @click.native="themeToggler" class="theme-button" :class="color">{{ buttonTitle }}</Button>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import Button from '@/components/atoms/Button';

import { StoreNames } from '@/store';
import { ThemeMapper, ThemeName } from '@/store/modules/Theme.module';
const { mapGetters, mapActions } = createNamespacedHelpers(StoreNames.Theme);

export default Vue.extend({
  name: 'ThemeToggleButton',

  components: { Button },

  computed: {
    ...mapGetters({
      curTheme: ThemeMapper.GET_THEME,
    }),

    isDark() {
      return this.curTheme === ThemeName.dark;
    },

    buttonTitle() {
      return `${this.isDark ? 'Dark🌟' : 'ZUM'} Theme`;
    },

    color() {
      return this.isDark ? '_dark' : '_light';
    },
  },

  methods: {
    ...mapActions({
      themeToggler: ThemeMapper.TOGGLE_THEME,
    }),
  },
});
</script>

<style lang="scss" scoped>
.theme-button {
  position: fixed;
  padding: 0;
  width: $button-size;
  height: $button-size;
  right: 7%;
  bottom: 5%;
  font-size: 0.6rem;
  border-radius: 50px;
  box-shadow: 0 0 0.2rem 0.1rem rgba($grey-700, 0.7);
  font-weight: 300;
  overflow-wrap: break-word;

  &:hover {
    font-weight: initial;
    text-decoration: none;
    background-color: $shallow-blue;
  }
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
