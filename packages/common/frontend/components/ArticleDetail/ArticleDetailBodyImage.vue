<template>
  <img :src="src" :class="$style.img" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.img {
  width: 100%;
}
</style>
