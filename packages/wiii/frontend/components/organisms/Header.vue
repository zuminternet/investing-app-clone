<template>
  <header>
    <Title>{{ titleText }}</Title>
    <Menus />
    <!-- market에서 지수, 주식, 코인 메뉴헤더 추가 -->
    <slot />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/molecules/Title';
import Menus from '@/components/molecules/HeaderMenus';

export default Vue.extend({
  name: 'HomeHeader',

  components: {
    Title,
    Menus,
  },

  props: {
    titleText: {
      type: String,
      required: true,
    },
  },
});
</script>
