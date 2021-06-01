<template>
  <div class="item-detail-overall-info-box">
    <item-detail-overall-info-row
      v-for="(element, index) in itemDetailForRow"
      :key="index"
      :element="element"
    ></item-detail-overall-info-row>
  </div>
</template>

<script>
import ItemDetailOverallInfoRow from '../components/ItemDetailOverallInfoRow.vue';
import { text } from '../constants';

export default {
  name: 'ItemDetailOverallInfoBox',
  components: {
    ItemDetailOverallInfoRow,
  },

  props: {
    itemDetail: {
      type: Object,
      required: true,
    },
  },

  computed: {
    itemDetailForRow() {
      const { adjClose, adjLow, adjHigh, close, open, volume, high, low } = this.itemDetail;
      const { ADJ_CLOSE, ADJ_LOW, ADJ_HIGH, CLOSE, OPEN, VOLUME, HIGH, LOW } = text;

      return [
        [ADJ_CLOSE, adjClose],
        [ADJ_LOW, adjLow],
        [ADJ_HIGH, adjHigh],
        [CLOSE, close],
        [OPEN, open],
        [VOLUME, volume],
        [HIGH, high],
        [LOW, low],
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-info-box {
  display: flex;
  flex-direction: column;
}
</style>
