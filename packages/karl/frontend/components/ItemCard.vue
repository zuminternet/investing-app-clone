<template>
  <button class="item-card" @click="$emit('route-to-item-detail')">
    <div class="item-information-except-price">
      {{item.itemName}}

      <div class="item-sub-information">
        {{item.itemTime}} |
        {{item.itemCategory}}
      </div>
    </div>
    <div class="empty-space"></div>
    <div class="item-information-price">
      {{item.itemPrice}}
      <div class="item-sub-information">
        {{item.fluctuationPrice}} 
        ({{item.fluctuationRate}})
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['item'],
}
</script>

<style scoped lang="scss">
  .item-card {
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    background-color: grey;
  }

  .empty-space {
    flex:1
  }

</style>