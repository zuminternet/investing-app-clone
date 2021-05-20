<template>
  <div class="item-detail-overall-info-box">
    <item-detail-overall-info-row v-for="(information, index) in itemOverallInformations" :key="index" :information="information"></item-detail-overall-info-row>
  </div>
</template>

<script>
import ItemDetailOverallInfoRow from '../components/ItemDetailOverallInfoRow.vue'

export default {
  name:"ItemDetailOverallInfoBox",
  components: {
    ItemDetailOverallInfoRow
  },
  props: ['itemOverallInformations'],
}
</script>

<style scoped lang="scss">
  .item-detail-overall-info-box {
    display: flex;
    flex-direction: column;
  }

</style>