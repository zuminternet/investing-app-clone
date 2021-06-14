<template>
  <div class="area rows-space-between ">
    <Link v-for="{ id, name, href } in homeMenuData" :key="id" :name="name" :href="href" />
    <Link :name="hasAuth" :href="'/user'" id="menu-user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Link from '@/components/atoms/RouterLink.vue';
import Button from '@/components/atoms/Button.vue';

import { HomeMenuData } from '@/type/views';

export default Vue.extend({
  name: 'HeaderMenus',

  components: { Link, Button },

  computed: {
    ...mapState(['auth', 'ticker']),

    hasAuth() {
      return this.auth ? '🚀' : '로그인 🏄‍♂️';
    },

    homeMenuData() {
      const ticker = this.ticker || '005930';
      const [home, market, news] = HomeMenuData;
      return [home, { ...market, href: market.href + ticker }, { ...news, href: news.href + ticker }];
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
