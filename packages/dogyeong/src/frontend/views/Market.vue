<template>
  <div>
    <HeaderBar>
      시장
    </HeaderBar>
    <HeaderNav>
      <ul class="header-nav-list">
        <li
          v-for="route in navRoutes"
          :key="route.id"
          :class="{ active: route.id === currentNavId }"
          @click.prevent="onClickHeaderNav(route.id)"
        >
          {{ route.title }}
        </li>
      </ul>
    </HeaderNav>
    <main>
      <!-- Slider main container -->
      <div ref="swiperContainer" class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <MarketExchange></MarketExchange>
          </div>
          <div class="swiper-slide">
            <MarketStock></MarketStock>
          </div>
          <div class="swiper-slide">
            <MarketCurrency></MarketCurrency>
          </div>
        </div>
      </div>
    </main>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import BottomNav from '@/components/BottomNav/BottomNav';
import MarketExchange from '@/components/Market/MarketExchange';
import MarketCurrency from '@/components/Market/MarketCurrency';
import MarketStock from '@/components/Market/MarketStock';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Swiper from 'swiper';

export default Vue.extend({
  name: 'Index',

  components: {
    HeaderBar,
    BottomNav,
    MarketExchange,
    MarketCurrency,
    MarketStock,
    HeaderNav,
  },

  data() {
    return {
      swiper: null,
      navRoutes: [
        { id: 'exchange', title: '지수' },
        { id: 'stock', title: '주식' },
        { id: 'virtualCurrency', title: '가상화폐' },
      ],
      currentNavId: 'exchange',
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

    this.swiper.on('slideChangeTransitionEnd', (swiper) => this.slideTo(swiper.activeIndex));
  },

  beforeDestroy() {
    this.swiper.destroy();
  },

  methods: {
    onClickHeaderNav(id) {
      const index = this.navRoutes.findIndex((route) => route.id === id) + 1;

      if (!index) return;

      this.slideTo(index);
    },
    slideTo(index) {
      this.swiper.slideTo(index);

      // currentNavId 설정을 위한 index 처리
      if (index === 0) index = this.navRoutes.length;
      else if (index > this.navRoutes.length) index = 1;

      this.currentNavId = this.navRoutes[index - 1].id;
    },
  },
});
</script>

<style lang="scss" scoped>
.swiper-container {
  .swiper-slide {
    min-height: 800px;
  }
}
.header-nav-list {
  display: flex;

  li {
    margin-right: 16px;
    color: var(--sub-text-color);

    &.active {
      color: var(--text-color);
    }
  }
}
</style>
