<template>
  <p class="card" :style="{ ...style }">{{ title }}</p>
</template>

<script lang="ts">
import Vue from 'vue';
import { blue700 } from '@/styles/index.scss';

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: blue700,
    },
    titleText: {
      type: String,
      default: '',
    },
    fontSize: {
      type: [String, Number],
      default: '2em',
    },
    fontWeight: {
      type: [String, Number],
      default: 900,
    },
  },

  computed: {
    style() {
      return {
        color: this.color,
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
      };
    },

    title() {
      return this.titleText;
    },
  },
});
</script>
