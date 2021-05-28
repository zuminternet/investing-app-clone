<template>
  <div>
    <template v-if="isBackButton">
      <input class="header-button" type="button" @click="goBack" />
    </template>

    <template v-else>
      <input class="header-button" type="button" />
    </template>
  </div>
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
