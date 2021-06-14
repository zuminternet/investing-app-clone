<template>
  <div class="area rows-space-between ">
    <Link class="market-menus-link" v-for="{ name, href } in marketMenuData" :key="name" :name="name" :href="href" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Link from '@/components/atoms/RouterLink.vue';

export default Vue.extend({
  name: 'MarketMenus',

  components: { Link },

  data() {
    return {
      marketMenuData: [
        { name: '주식', href: '/markets/stocks/' },
        { name: '지수', href: '/markets/indexes/' },
        { name: '코인', href: '/markets/coins/' },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.market-menus-link {
  background-color: transparent;

  &.router-link-active,
  &.router-link:hover {
    background-color: transparent;
    color: $blue-700;
    font-weight: bolder;
    text-decoration: underline 3px $blue-700;
  }
}
</style>
