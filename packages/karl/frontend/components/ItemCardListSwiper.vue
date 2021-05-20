<template>
  <swiper class="item-card-list-swiper">
    <swiper-slide v-for="(items, index) in itemCollections" :key="index">
      <item-card-list :items="items" :excludingHeight="150"></item-card-list>
    </swiper-slide>
  </swiper>
</template>

<script>
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ItemCardList from '../components/ItemCardList.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name:"ItemCardListSwiper",
  components: {
    Swiper,
    SwiperSlide,
    ItemCardList
  },
  computed: {
    ...mapState({
      stockItems: state => state.market.stockItems
    }),
    ...mapGetters('market', {
      itemCollections: 'itemCollections'
    })
  },
}
</script>

<style scoped lang="scss">
  .item-card-list-swiper {
    display: flex;
    flex:1;
    width: 100%;
  }

</style>