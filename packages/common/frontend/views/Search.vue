<template>
  <div class="search-page">
    <multipurpose-header isSearch></multipurpose-header>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <item-card-list :items="searchedItems" :excludedHeight="100" :userInfo="userInfo" isSearch></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <item-card-list :items="searchedItems" :excludedHeight="100"></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <item-card-list :items="searchedItems" :excludedHeight="100"></item-card-list>
      </swiper-slide>
    </custom-swiper>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapState, mapGetters } from 'vuex';

import MultipurposeHeader from '../components/MultipurposeHeader.vue';
import CustomSwiper from '../components/CustomSwiper.vue';
import ItemCard from '../components/ItemCard.vue';
import ItemCardList from '../components/ItemCardList.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Search',

  components: {
    MultipurposeHeader,
    CustomSwiper,
    ItemCard,
    ItemCardList,
    SwiperSlide,
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      searchedItems: (state) => state.search.searchedItems,
    }),
  },

  data() {
    return {
      swiperNavigatorButtonNames: [text.ITEM, text.NEWS, text.ANALYSIS],
    };
  },
};
</script>

<style scoped lang="scss">
.search-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
