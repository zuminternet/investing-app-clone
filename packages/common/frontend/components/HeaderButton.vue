<template>
  <input v-if="isBackButton" class="header-button" type="button" @click="goBack" />
  <input v-else-if="isGoSearchButton" class="header-button" type="button" @click="goSearch" />
  <input v-else class="header-button" type="button" @click="$emit('handle-header-button-click')" />
</template>

<script>
export default {
  name: 'HeaderButton',
  props: {
    isBackButton: {
      type: Boolean,
      default: false,
    },

    isGoSearchButton: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goBack() {
      this.$router.back();
    },

    goSearch() {
      console.log('test');
      this.$router.push('search');
    },
  },
};
</script>

<style scoped lang="scss">
.header-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
