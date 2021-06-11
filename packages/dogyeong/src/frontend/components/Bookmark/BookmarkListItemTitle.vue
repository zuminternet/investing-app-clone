<template>
  <span :class="$style.title"><slot /></span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BookmarkListItemTitle',
});
</script>

<style lang="scss" module>
.title {
  font-size: 18px;
  display: block;
  margin-bottom: 4px;
}
</style>
