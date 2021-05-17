<template>
  <button class="item-card">
    <div class="item-information-except-price">
      {{itemName}}

      <div class="item-sub-information">
        {{itemTime}} |
        {{itemCategory}}
      </div>
    </div>
    <div class="empty-space"></div>
    <div class="item-information-price">
      {{itemPrice}}
      <div class="item-sub-information">
        {{fluctuationPrice}} 
        ({{fluctuationRate}})
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ItemCard',

  data: function() {
    return {
      itemName: '코스피 지수',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%'
    }
  }
}
</script>

<style scoped>
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