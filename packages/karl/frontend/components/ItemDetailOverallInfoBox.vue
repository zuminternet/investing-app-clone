<template>
  <div class="item-detail-overall-info-box">
    <item-detail-overall-info-row v-for="(information, index) in informations" :key="index"></item-detail-overall-info-row>
  </div>
</template>

<script>
import ItemDetailOverallInfoRow from '../components/ItemDetailOverallInfoRow.vue'

export default {
  name:"ItemDetailOverallInfoBox",
  components: {
    ItemDetailOverallInfoRow
  },
  data() {
    return {
      informations: [{}, {}, {}, {}, {}]
    }
  }
  

}
</script>

<style>
  .item-detail-overall-info-box {
    display: flex;
    flex-direction: column;
  }

</style>