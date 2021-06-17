<template>
  <div class="item-detail-overall-info-box">
    <loading v-if="isLoading" :loadingHeight="248" />
    <error v-else-if="isError" />
    <template v-else
      ><item-detail-overview-row v-for="(element, index) in itemDetailForRow" :key="index" :element="element"
    /></template>
  </div>
</template>

<script>
import ItemDetailOverviewRow from './ItemDetailOverviewRow.vue';
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';

import { text } from '../../constants';

export default {
  name: 'ItemDetailOverviewBox',
  components: {
    ItemDetailOverviewRow,
    Loading,
    Error,
  },

  props: {
    itemDetail: {
      type: Object,
      required: true,
    },

    isLoading: {
      type: Boolean,
      required: true,
    },

    isError: {
      type: Boolean,
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
