<template>
  <li :class="$style.item">
    <div><slot /></div>
    <div><slot name="button" /></div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BookmarkListItem',
});
</script>

<style lang="scss" module>
.item {
  padding: 24px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}
</style>
