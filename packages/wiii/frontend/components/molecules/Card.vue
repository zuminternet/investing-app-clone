<template>
  <div class="card">
    <Words :text="'CARD'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words';

/** 댓글 1개, 마켓 상세 1개 등 개별 카드 컴포넌트 */
export default Vue.extend({
  props: {
    //
  },

  components: { Words },
});
</script>

<style lang="scss" scoped></style>
