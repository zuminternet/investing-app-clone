<template>
  <button :class="$style.retry" v-on="$listeners">&#8635;</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ErrorRetryButton',
});
</script>

<style lang="scss" module>
.retry {
  border-radius: 100%;
  background-color: var(--app-bg-color);
  width: 60px;
  height: 60px;
  margin: 20px;
  font-size: 22px;
}
</style>
