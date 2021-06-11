<template>
  <span :class="{ 'default-text': true, 'button-active': buttonActive, 'app-title': appTitle, 'page-title': pageTitle }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    buttonActive: {
      type: Boolean,
      default: false,
    },

    appTitle: {
      type: Boolean,
      default: false,
    },

    pageTitle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.default-text {
  color: var(--text-color);
}

.button-active {
  color: var(--active-button-color);
  font-weight: bold;
}

.app-title {
  color: var(--title-color);
  font-weight: 900;
}

.page-title {
  font-weight: bold;
}
</style>
