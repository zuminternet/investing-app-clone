<template>
  <div id="appWrapper" :class="theme">
    <router-view />
    <ThemeToggleButton />
  </div>
</template>

<script>
import { ThemeModule } from '@/store/';
import ThemeToggleButton from '@/components/molecules/ThemeToggleButton';
import '@/styles/index.scss';

export default {
  name: 'App',

  components: { ThemeToggleButton },

  computed: {
    theme() {
      return ThemeModule.theme;
    },
  },
};
</script>
