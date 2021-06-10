<template>
  <div class="news-page">
    <multipurpose-header isNews />
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <news-list>
            <news-headline>
              <news-image :src="news[0].image_url" />
              <news-text-box>
                <news-text-box-title>
                  {{ news[0].title }}
                </news-text-box-title>
                <news-text-box-desc :author="news[0].source" :publishDate="news[0].date"></news-text-box-desc>
              </news-text-box>
            </news-headline>
            <news-list-item v-for="element in news" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <news-list>
            <news-list-item v-for="element in news" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <news-list>
            <news-list-item v-for="element in stockNews" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <news-list>
            <news-list-item v-for="element in cryptoNews" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames" />
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapActions, mapState, mapGetters } from 'vuex';

import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import CustomSwiper from '../../../common/frontend/components/CustomSwiper.vue';
import BottomNaviagtor from '../../../common/frontend/components/BottomNaviagtor.vue';
import NewsList from '../../../common/frontend/components/News/NewsList.vue';
import NewsListItem from '../../../common/frontend/components/News/NewsListItem.vue';
import NewsImage from '../../../common/frontend/components/News/NewsImage.vue';
import NewsHeadline from '../../../common/frontend/components/News/NewsHeadline.vue';
import NewsTextBox from '../../../common/frontend/components/News/NewsTextBox.vue';
import NewsTextBoxDesc from '../../../common/frontend/components/News/NewsTextBoxDesc.vue';
import NewsTextBoxTitle from '../../../common/frontend/components/News/NewsTextBoxTitle.vue';
import ListWrapper from '../../../common/frontend/components/ListWrapper.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'News',
  components: {
    MultipurposeHeader,
    CustomSwiper,
    BottomNaviagtor,
    SwiperSlide,
    NewsList,
    NewsListItem,
    NewsImage,
    NewsHeadline,
    NewsTextBox,
    NewsTextBoxDesc,
    NewsTextBoxTitle,
    ListWrapper,
  },

  computed: {
    ...mapState({
      news: (state) => state.article.news,
    }),

    ...mapGetters('article', {
      stockNews: 'stockNews',
      cryptoNews: 'cryptoNews',
    }),
  },

  data() {
    const { MARKET, NEWS, BOOKMARK, MORE, LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY } = text;

    return {
      swiperNavigatorButtonNames: [LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK, MORE],
    };
  },

  methods: {
    ...mapActions('article', ['getNews']),
  },

  mounted() {
    this.getNews();
  },
};
</script>

<style scoped lang="scss"></style>
