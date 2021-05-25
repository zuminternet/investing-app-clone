<template>
  <div class="item-detail-overall-info-row">
    <custom-text>{{ rowName }}</custom-text>
    <empty-space></empty-space>

    <custom-text>{{ rowValue }}</custom-text>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue';
import EmptySpace from '../components/karl/EmptySpace.vue';

export default {
  name: 'ItemDetailOverallInfoRow',
  components: {
    CustomText,
    EmptySpace,
  },
  props: ['information'],
  data() {
    const [rowName, rowValue] = this.information;
    return {
      rowName,
      rowValue,
      EmptySpace,
    };
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-info-row {
  display: flex;
  height: 20px;
}
</style>
