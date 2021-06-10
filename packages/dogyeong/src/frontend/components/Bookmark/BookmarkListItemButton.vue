<template>
  <button :class="$style.bookmarkButton" type="button" v-on="$listeners">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BookmarkListItemButton',
});
</script>

<style lang="scss" module>
.bookmarkButton {
  font-size: 24px;
  height: 100%;
  padding: 4px;
}
</style>
