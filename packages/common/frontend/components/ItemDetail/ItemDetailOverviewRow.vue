<template>
  <div class="item-detail-overall-info-row">
    <custom-text overviewRowName>{{ name }}</custom-text>
    <empty-space></empty-space>
    <custom-text overviewRowValue>{{ value }}</custom-text>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue';
import EmptySpace from '../karl/EmptySpace.vue';
import { text } from '../../constants';

export default {
  name: 'ItemDetailOverviewRow',
  components: {
    CustomText,
    EmptySpace,
  },
  props: {
    element: {
      type: Array,
      required: true,
    },
  },

  computed: {
    name() {
      return this.element[0];
    },

    value() {
      return this.element[1] ? this.element[1] : text.NO_INFO;
    },
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-info-row {
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
