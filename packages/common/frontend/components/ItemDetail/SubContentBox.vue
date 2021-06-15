<template>
  <div class="sub-content-box">
    <div class="sub-content-title-box">
      <custom-text subContentTitle>{{ text }}</custom-text>
      <empty-space></empty-space>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue';
import EmptySpace from '../karl/EmptySpace.vue';

export default {
  components: { CustomText, EmptySpace },
  name: 'SubContentBox',

  props: {
    text: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sub-content-box {
  width: 100%;
}

.sub-content-title-box {
  display: flex;
  height: 20px;
  background-color: var(--gray-color);
  align-items: center;
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>
