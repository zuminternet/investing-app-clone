<template>
  <input v-if="isFavoriteButton" class="item-card-button" type="button" @click="addFavorite" />
  <input v-else class="item-card-button" type="button" @click="$emit('handle-item-card-button-click')" />
</template>

<script>
export default {
  name: 'ItemCardButton',
  props: {
    isFavoriteButton: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    addFavorite() {
      // 즐겨찾기 기능 구현해야함
    },
  },
};
</script>

<style scoped lang="scss">
.item-card-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
