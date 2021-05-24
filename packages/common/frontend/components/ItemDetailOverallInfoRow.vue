<template>
  <div class="item-detail-overall-info-row">
    <custom-text>{{ rowName }}</custom-text>
    <div class="empty-space"></div>
    <custom-text>{{ rowValue }}</custom-text>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue';

export default {
  name: 'ItemDetailOverallInfoRow',
  components: {
    CustomText,
  },
  props: ['information'],
  data() {
    const [rowName, rowValue] = this.information;
    return {
      rowName,
      rowValue,
    };
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-info-row {
  display: flex;
  height: 20px;
}

.empty-space {
  flex: 1;
}
</style>
