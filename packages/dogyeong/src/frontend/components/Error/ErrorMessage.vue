<template>
  <span :class="$style.message"><slot></slot></span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ErrorMessage',
});
</script>

<style lang="scss" module>
.message {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: var(--text-color);
}
</style>
