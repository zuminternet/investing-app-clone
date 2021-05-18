<template>
  <div id="home-page">
    <multipurpose-header></multipurpose-header>
    <top-naviagtor></top-naviagtor>
    <item-card-list-swiper></item-card-list-swiper>
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemCardListSwiper from '../components/ItemCardListSwiper.vue'


export default {
  name: 'Home',
  components: {
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader,
    ItemCardListSwiper
  }
};
</script>

<style scoped>
  #home-page {
    display:flex;
    flex-direction: column;
    flex:1
  }


</style>
