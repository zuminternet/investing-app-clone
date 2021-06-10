<template>
  <Layout>
    <Header>
      <HeaderTitle>
        시장
        <template #right>
          <SearchButton />
        </template>
      </HeaderTitle>
      <HeaderNav>
        <HeaderNavItem
          v-for="route in navRoutes"
          :key="route.id"
          :active="route.id === currentNavId"
          @clickItem="onClickHeaderNav(route.id)"
        >
          {{ route.title }}
        </HeaderNavItem>
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
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Header, HeaderTitle, HeaderNav, HeaderNavItem } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import MarketIndex from '@/components/Market/MarketIndex.vue';
import MarketCoin from '@/components/Market/MarketCoin.vue';
import MarketStock from '@/components/Market/MarketStock.vue';
import { Swiper, SwiperSlide } from '@/components/Swiper';
import swiperMixin from '@/mixin/swiperMixin';
import SearchButton from '@/components/SearchButton/SearchButton.vue';

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
    HeaderNavItem,
    SearchButton,
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

<style lang="scss" scoped></style>
