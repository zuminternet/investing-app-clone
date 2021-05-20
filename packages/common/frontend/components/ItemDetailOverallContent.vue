<template>
  <div id="item-detail-overall-content">
    <!-- 차트 컴포넌트 자리  -->
    <item-detail-overall-info-box :itemOverallInformations="itemDetailInformations.itemOverallInformations"></item-detail-overall-info-box>
    <!-- 댓글 컴포넌트 자리 -->
    <!-- 뉴스 컴포넌트 자리 -->
    <!-- 분석 컴포넌트 자리 -->
  </div>
</template>

<script>
import ItemDetailOverallInfoBox from '../components/ItemDetailOverallInfoBox.vue'

export default {
  name:"ItemDetailOverallContent",
  components: {
    ItemDetailOverallInfoBox
  },
  props: ['itemDetailInformations'],

  created() {
    console.log(this.itemDetailInformations)
  }
}
</script>

<style scoped lang="scss">

</style>