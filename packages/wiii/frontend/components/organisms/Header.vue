<template>
  <header>
    <Title>{{ titleText }}</Title>
    <Menus />
    <MarketMenus v-show="isMarketView" />
    <slot />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/molecules/Title.vue';
import Menus from '@/components/molecules/HeaderMenus.vue';
import MarketMenus from '@/components/molecules/MarketMenus.vue';

export default Vue.extend({
  name: 'HomeHeader',

  components: {
    Title,
    Menus,
    MarketMenus,
  },

  props: {
    titleText: {
      type: String,
      required: true,
    },
  },

  computed: {
    isMarketView() {
      return this.$router.currentRoute.path.includes('/markets/');
    },
  },
});
</script>
