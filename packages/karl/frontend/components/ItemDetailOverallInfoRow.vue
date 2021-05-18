<template>
  <div class="item-detail-overall-info-row">
    <custom-text :message="'일일 변동폭'"></custom-text>
    <div class="empty-space"></div>
    <custom-text :message="'3,134.52'"></custom-text>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue'

export default {
  name:"ItemDetailOverallInfoRow",
  components: {
    CustomText
  },
  props: ['information']
}
</script>

<style scoped>
  .item-detail-overall-info-row {
    display: flex;
    height: 20px;
    /* background-color: green; */
  }

  .empty-space {
    flex:1
  }

</style>