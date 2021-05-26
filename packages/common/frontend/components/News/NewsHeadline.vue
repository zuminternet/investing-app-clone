<template>
  <article class="news-headline">
    <RouterLink :to="to" :style="headlineStyle">
      <slot></slot>
    </RouterLink>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 탭에서 가장 위에 위치하는 컴포넌트를 위한 컨테이너
 * @author dogyeong
 */

export default Vue.extend({
  name: 'NewsHeadline',

  props: {
    to: {
      type: String,
      required: true,
    },
    headlineStyle: {
      type: [Object, String],
      default: () => '',
    },
  },
});
</script>

<style lang="scss">
.news-headline {
  a {
    border-bottom: 1px solid gray;
    background-color: white;
    display: block;

    .news-img-container {
      width: 100%;
    }
    .news-text-container {
      padding: 12px;
    }
  }
}
</style>
