<template>
  <p>
    <span class="news-author" :style="authorStyle">{{ author }}</span>
    <span class="news-date" :style="dateStyle">{{ publishDate }}</span>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsTextBoxDesc',

  props: {
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    authorStyle: {
      type: [Object, String],
      default: () => '',
    },
    dateStyle: {
      type: [Object, String],
      default: () => '',
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  color: gray;

  .news-author {
    margin-right: 12px;
  }
}
</style>
