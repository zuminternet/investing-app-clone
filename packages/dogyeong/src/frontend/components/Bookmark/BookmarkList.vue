<template>
  <ul>
    <slot />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BookmarkList',
});
</script>

<style lang="scss" module></style>
