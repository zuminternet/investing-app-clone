<template>
  <div class="item-detail-overall-info-row">
    <custom-text>{{rowName}}</custom-text>
    <div class="empty-space"></div>
    <custom-text>{{rowValue}}</custom-text>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue'

export default {
  name:"ItemDetailOverallInfoRow",
  components: {
    CustomText
  },
  props: ['information'],
  data() {
    return {
      rowName: this.information[0],
      rowValue: this.information[1]
    }
  },
}
</script>

<style scoped lang="scss">
  .item-detail-overall-info-row {
    display: flex;
    height: 20px;
  }

  .empty-space {
    flex:1
  }

</style>