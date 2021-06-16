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
const { mapActions } = createNamespacedHelpers(StoreNames.Market);

export default {
  name: 'App',

  components: { ThemeToggleButton },

  data() {
    return {
      stocksPromise: null,
    };
  },

  computed: {
    ...mapGetters({
      theme: ThemeMapper.GET_THEME,
    }),
  },

  beforeMount() {
    this.stocksPromise = this.getAllStocks();
  },

  async mounted() {
    await this.stocksPromise;
    this.stocksPromise = null;
  },

  methods: {
    ...mapActions(['getAllStocks']),
  },
};
</script>
