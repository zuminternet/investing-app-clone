<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 리스트 컴포넌트
 * @author dogyeong
 */

export default Vue.extend({
  name: 'NewsList',
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
