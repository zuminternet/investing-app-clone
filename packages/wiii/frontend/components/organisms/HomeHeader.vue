<template>
  <header>
    <HomeTitle />
    <Menus />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeTitle from '@/components/molecules/HomeTitle';
import Menus from '@/components/molecules/HeaderMenus';

export default Vue.extend({
  name: 'HomeHeader',

  components: {
    HomeTitle,
    Menus,
  },
});
</script>
