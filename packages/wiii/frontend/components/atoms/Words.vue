<template>
  <p class="pure-text" :class="options">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * TextTypes
 * Words 문자열의 타입
 *
 */
export const TextTypes = {
  0: 'default',
  10: 'title',
  20: 'subtitle',
  30: 'mini',
} as const;

export default Vue.extend({
  props: {
    textType: {
      type: Number,
      default: 0,
      validator: (type) => type in TextTypes,
    },
  },
  computed: {
    options() {
      return [TextTypes[this.textType]];
    },
  },
});
</script>

<style lang="scss">
.pure-text {
  margin: 0;
  height: fit-content;
  font-size: 14px;
  line-height: 2;
  color: $grey-700;
  background-color: transparent;

  cursor: auto;

  &.default {
    font-size: 1rem;
  }

  &.subtitle {
    font-size: 1.5rem;
  }

  &.mini {
    font-size: 0.7rem;
  }

  .dark & {
    background-color: transparent;
    color: $grey-300;
  }
}
</style>
