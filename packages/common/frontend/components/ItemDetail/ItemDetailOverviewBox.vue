<template>
  <div class="item-detail-overall-info-box">
    <item-detail-overview-row
      v-for="(element, index) in itemDetailForRow"
      :key="index"
      :element="element"
    ></item-detail-overview-row>
  </div>
</template>

<script>
import ItemDetailOverviewRow from './ItemDetailOverviewRow.vue';
import { text } from '../../constants';

export default {
  name: 'ItemDetailOverviewBox',
  components: {
    ItemDetailOverviewRow,
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
