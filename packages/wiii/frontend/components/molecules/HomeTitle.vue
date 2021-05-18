<template>
  <Title :titleText="titleText" />
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '@/components/atoms/Title';
import { viewsTitle } from '@/type/views';

export default Vue.extend({
  name: 'HomeTitle',

  components: {
    Title,
  },

  computed: {
    titleText() {
      return viewsTitle.Home;
    },
  },
});
</script>

<style lang="scss" scoped></style>
