<template>
  <div class="area rows-space-between ">
    <Link v-for="{ id, name, href } in HomeMenuData" :key="id" :name="name" :href="href" />
    <Link :name="'🏄‍♂️'" :href="'/user'" id="menu-user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Link from '@/components/atoms/RouterLink';
import Button from '@/components/atoms/Button';

import { HomeMenuData } from '@/type/views';

export default Vue.extend({
  name: 'HeaderMenus',

  components: { Link, Button },

  data() {
    return {
      HomeMenuData,
    };
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
