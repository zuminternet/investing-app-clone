<template>
  <router-link :to="href" class="router-link" :class="isDarkTheme">{{ name }}</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isDarkTheme() {
      return this.isDark ? `dark` : ``;
    },
  },
});
</script>

<style lang="scss" scoped>
.router-link {
  @extend .card;

  padding: 5px 15px;
  margin: 5px;

  color: $blue-500;
  text-decoration: none;
  transition: all 0.08s ease-in-out;

  &:hover {
    color: $grey-900;
    background-color: $blue-300;
  }

  &.dark {
    color: $grey-100;
    text-shadow: 0 0 15px $red-neon;
    background-color: $grey-700;
    box-shadow: 0 0 10px $red-neon;

    &:hover {
      background-color: $grey-500;
      color: $red-neon;
      font-weight: bold;
    }
  }

  &-active,
  &-exact-active {
    &.dark {
      color: $red-neon;
    }
  }
}
</style>
