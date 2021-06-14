<template>
  <div class="area rows-space-between ">
    <Link v-for="({ name, href }, id) in homeMenuData" :key="id" :name="name" :href="href" />
    <Link :name="hasAuth" :href="'/user'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Link from '@/components/atoms/RouterLink.vue';
import Button from '@/components/atoms/Button.vue';

export default Vue.extend({
  name: 'HeaderMenus',

  components: { Link, Button },

  computed: {
    ...mapState(['auth', 'lastTicker', 'lastNews']),

    hasAuth() {
      return this.auth ? 'MyPage 🚀' : 'LogIn 🏄‍♂️';
    },

    homeMenuData() {
      // const ticker = this.ticker || '005930';
      return [
        { name: 'Market', href: '/markets/stocks/' },
        { name: 'News', href: '/news/' },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
#menu-user {
  width: max-content;
  background-color: $grey-100;
  border-radius: 90px;
}
</style>
