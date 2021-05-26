<template>
  <article>
    <slot></slot>
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
});
</script>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid gray;
  background-color: white;

  .news-img-container {
    width: 100%;
  }
  .news-text-container {
    padding: 12px;
  }
}
</style>
