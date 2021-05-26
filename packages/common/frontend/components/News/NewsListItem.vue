<template>
  <li class="news-list-item">
    <RouterLink class="news-link" :to="to" :style="listStyle">
      <slot></slot>
    </RouterLink>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsListItem',

  props: {
    to: {
      type: String,
      default: () => '#',
    },
    listStyle: {
      type: [Object, String],
      default: () => '',
    },
  },
});
</script>

<style lang="scss">
.news-list-item {
  .news-link {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid gray;
  }

  .news-img-container {
    margin-right: 12px;
    width: 40%;
    padding-top: 20%;
  }
}
</style>
