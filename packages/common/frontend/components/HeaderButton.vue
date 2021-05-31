<template>
  <input v-if="isBackButton" class="header-button" type="button" @click="goBack" />
  <input v-else class="header-button" type="button" />
</template>

<script>
export default {
  name: 'HeaderButton',
  props: {
    isBackButton: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    goBack() {
      this.$router.back();
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
