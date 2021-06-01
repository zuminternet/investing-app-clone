<template>
  <div class="item-detail-overall-content" :style="style">
    <!-- 차트 컴포넌트 자리  -->
    <item-detail-overall-info-box :itemDetail="itemDetail"></item-detail-overall-info-box>
    <!-- 댓글 컴포넌트 자리 -->
    <!-- 뉴스 컴포넌트 자리 -->
    <!-- 분석 컴포넌트 자리 -->
  </div>
</template>

<script>
import ItemDetailOverallInfoBox from '../components/ItemDetailOverallInfoBox.vue';

export default {
  name: 'ItemDetailOverallContent',
  components: {
    ItemDetailOverallInfoBox,
  },
  props: {
    itemDetail: {
      type: Object,
      required: true,
    },

    excludingHeight: {
      type: Number,
      default: 150,
    },
  },

  computed: {
    style() {
      return {
        height: `calc(100vh - ${this.excludingHeight}px)`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
}
</style>
