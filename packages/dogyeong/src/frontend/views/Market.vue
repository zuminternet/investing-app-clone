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
      <Swiper @endSlide="onEndSlide">
        <SwiperSlide>
          <MarketIndex></MarketIndex>
        </SwiperSlide>
        <SwiperSlide>
          <MarketStock></MarketStock>
        </SwiperSlide>
        <SwiperSlide>
          <MarketCoin></MarketCoin>
        </SwiperSlide>
      </Swiper>
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
import Swiper from '@/components/Swiper/Swiper.vue';
import SwiperSlide from '@/components/Swiper/SwiperSlide.vue';

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
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiper: null,
      navRoutes: [
        { id: 'index', title: '지수', index: 0 },
        { id: 'stock', title: '주식', index: 1 },
        { id: 'coin', title: '가상화폐', index: 2 },
      ],
      currentNavId: 'index',
    };
  },

  created() {
    this.getMarketData();
  },

  methods: {
    ...mapActions(['getIndices', 'getCoins', 'getStocks']),

    onClickHeaderNav(id) {
      const { index } = this.navRoutes.find((route) => route.id === id);
      this.currentNavId = id;
      this.slideTo(index);
    },

    onEndSlide({ activeIndex }) {
      const { id } = this.navRoutes.find((route) => route.index === activeIndex);
      this.currentNavId = id;
      this.getMarketData();
    },

    slideTo(index) {
      this.swiper.slideTo(index);
      this.getMarketData();
    },

    getMarketData() {
      if (this.currentNavId === 'index') this.getIndices();
      if (this.currentNavId === 'stock') this.getStocks();
      if (this.currentNavId === 'coin') this.getCoins();
    },
  },
});
</script>

<style lang="scss" scoped>
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
