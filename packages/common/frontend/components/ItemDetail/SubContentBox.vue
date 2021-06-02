<template>
  <div class="sub-content-box">
    <div class="sub-content-box-button" @click="$emit('handle-sub-content-box-button')">
      <custom-text>{{ text }}</custom-text>
      <empty-space></empty-space>
      <div class="right-arrow-img"></div>
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

.sub-content-box-button {
  display: flex;
  height: 20px;
  background-color: gray;
  align-items: center;
}

.right-arrow-img {
  width: 15px;
  height: 15px;
  background-color: red;
}
</style>
