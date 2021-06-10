<template>
  <div id="appWrapper" :class="theme">
    <router-view />
    <ThemeToggleButton />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ThemeToggleButton from '@/components/molecules/ThemeToggleButton';
import '@/styles/index.scss';
import { StoreNames } from '@/store';
import { ThemeMapper } from './store/modules/Theme.module';

const { mapGetters } = createNamespacedHelpers(StoreNames.Theme);

export default {
  name: 'App',

  components: { ThemeToggleButton },

  computed: {
    ...mapGetters({
      theme: ThemeMapper.GET_THEME,
    }),
  },
};
</script>
