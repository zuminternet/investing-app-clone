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
      <Swiper ref="swiper" @endSlide="onEndSlide">
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
import swiperMixin from '@/mixin/swiperMixin';

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

  mixins: [
    swiperMixin({
      fetchData() {
        if (this.currentNavId === 'index') this.getIndices();
        if (this.currentNavId === 'stock') this.getStocks();
        if (this.currentNavId === 'coin') this.getCoins();
      },
    }),
  ],

  data() {
    return {
      navRoutes: [
        { id: 'index', title: '지수', index: 0 },
        { id: 'stock', title: '주식', index: 1 },
        { id: 'coin', title: '가상화폐', index: 2 },
      ],
      currentNavId: 'index',
    };
  },

  methods: {
    ...mapActions(['getIndices', 'getCoins', 'getStocks']),

    onClickHeaderNav(id) {
      this.handleHeaderNavClick(id);
    },

    onEndSlide(swiper) {
      this.handleEndSlide(swiper);
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
