<template>
  <div class="item-card-list">
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
    <item-card></item-card>
  </div>
</template>

<script>
import ItemCard from '../components/ItemCard.vue'


export default {
    name:"ItemCardList",
    components: {
      ItemCard
    }
}
</script>

<style scoped>
  .item-card-list {
    display: flex;
    /* position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 50px; */
    height: calc(100vh - 150px);
    flex-wrap:nowrap;
    overflow-y:auto;
    flex-direction: column;
  }

</style>