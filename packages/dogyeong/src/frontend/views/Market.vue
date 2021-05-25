<template>
  <Layout>
    <Header>
      <HeaderTitle>시장</HeaderTitle>
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
    </Header>
    <main>
      <!-- Slider main container -->
      <div ref="swiperContainer" class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide">
            <MarketIndex></MarketIndex>
          </div>
          <div class="swiper-slide">
            <MarketStock></MarketStock>
          </div>
          <div class="swiper-slide">
            <MarketCoin></MarketCoin>
          </div>
        </div>
      </div>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Header, HeaderTitle, HeaderNav } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import MarketIndex from '@/components/Market/MarketIndex.vue';
import MarketCoin from '@/components/Market/MarketCoin.vue';
import MarketStock from '@/components/Market/MarketStock.vue';
import Swiper from 'swiper';

export default Vue.extend({
  name: 'Index',

  components: {
    Header,
    HeaderTitle,
    BottomNav,
    Layout,
    MarketIndex,
    MarketCoin,
    MarketStock,
    HeaderNav,
  },

  data() {
    return {
      swiper: null,
      navRoutes: [
        { id: 'index', title: '지수' },
        { id: 'stock', title: '주식' },
        { id: 'coin', title: '가상화폐' },
      ],
      currentNavId: 'index',
    };
  },

  mounted() {
    this.swiper = new Swiper(this.$refs.swiperContainer, {
      loop: true,
      touchAngle: 20,
      threshold: 14,
      speed: 150,
      grabCursor: true,
    });

    this.swiper.on('slideChangeTransitionEnd', (swiper) => this.slideTo(swiper.activeIndex));
  },

  beforeDestroy() {
    this.swiper.destroy();
  },

  methods: {
    ...mapActions(['getIndices', 'getCoins', 'getStocks']),

    onClickHeaderNav(id) {
      const index = this.navRoutes.findIndex((route) => route.id === id) + 1;

      if (!index) return;

      this.slideTo(index);
    },
    slideTo(index) {
      this.swiper.slideTo(index);

      // currentNavId 설정을 위한 index 처리. index를 1~3으로 유지시켜준다
      if (index === 0) index = this.navRoutes.length;
      else if (index > this.navRoutes.length) index = 1;

      this.currentNavId = this.navRoutes[index - 1].id;

      if (this.currentNavId === 'index') this.getIndices();
      if (this.currentNavId === 'stock') this.getStocks();
      if (this.currentNavId === 'coin') this.getCoins();
    },
  },
});
</script>

<style lang="scss" scoped>
main {
  flex: 1;
  overflow: hidden;
}
.swiper-container {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
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
