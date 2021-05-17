<template>
  <div>
    <HeaderBar>
      <h1>시장</h1>
    </HeaderBar>
    <!-- Slider main container -->
    <div ref="swiperContainer" class="swiper-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import BottomNav from '@/components/BottomNav/BottomNav';
import MarketExchange from '@/components/Market/MarketExchange';
import MarketCurrency from '@/components/Market/MarketCurrency';
import MarketStock from '@/components/Market/MarketStock';
import Swiper from 'swiper';

export default {
  name: 'Index',

  components: {
    HeaderBar,
    BottomNav,
    MarketExchange,
    MarketCurrency,
    MarketStock,
  },

  data() {
    return {
      swiper: null,
    };
  },

  mounted() {
    this.swiper = new Swiper(this.$refs.swiperContainer, {
      loop: true,
      autoHeight: true,
      touchAngle: 20,
      threshold: 14,
      iOSEdgeSwipeThreshold: 30,
      speed: 150,
      grabCursor: true,
    });
  },

  beforeDestroy() {
    this.swiper.destroy();
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: red;
}

.swiper-container {
  background-color: #fff;

  .swiper-slide {
    min-height: 800px;
  }
}
</style>
