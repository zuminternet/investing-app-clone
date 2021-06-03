<template>
  <Title :title="titleText" />
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

  data() {
    return { titleText: viewsTitle.News };
  },
});
</script>
