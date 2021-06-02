<template>
  <div class="news-text-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 리스트 내의 텍스트 영역 박스
 * @author dogyeong
 */

export default Vue.extend({
  name: 'NewsTextBox',
});
</script>

<style scoped>
.news-text-container {
  flex: 1;
}
</style>
