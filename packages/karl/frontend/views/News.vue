<template>
  <div class="news-page">
    <multipurpose-header isNews />
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <loading v-if="newsIsLoading" />
          <error v-else-if="newsIsError" />
          <empty v-else-if="!news.length" />
          <news-list v-else>
            <news-headline v-if="firstNews" @handle-click="routeToNewsDetail" :id="firstNews._id">
              <news-image :src="firstNews.image_url" />
              <news-text-box>
                <news-text-box-title>
                  {{ firstNews.title }}
                </news-text-box-title>
                <news-text-box-desc :author="firstNews.source" :publishDate="firstNews.date" :replyCount="firstNews.replyCount" />
              </news-text-box>
            </news-headline>
            <news-list-item
              v-for="element in news.slice(1, news.length)"
              :key="element._id"
              @handle-click="routeToNewsDetail"
              :id="element._id"
            >
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <loading v-if="hotNewsIsLoading" />
          <error v-else-if="hotNewsIsError" />
          <empty v-else-if="!hotNews.length" />
          <news-list v-else>
            <news-headline v-if="firstHotNews" @handle-click="routeToNewsDetail" :id="firstHotNews._id">
              <news-image :src="firstHotNews.image_url" />
              <news-text-box>
                <news-text-box-title>
                  {{ firstHotNews.title }}
                </news-text-box-title>
                <news-text-box-desc
                  :author="firstHotNews.source"
                  :publishDate="firstHotNews.date"
                  :replyCount="firstHotNews.replyCount"
                />
              </news-text-box>
            </news-headline>
            <news-list-item
              v-for="element in hotNews.slice(1, hotNews.length)"
              :key="element._id"
              @handle-click="routeToNewsDetail"
              :id="element._id"
            >
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <loading v-if="newsIsLoading" />
          <error v-else-if="newsIsError" />
          <empty v-else-if="!stockNews.length" />
          <news-list v-else>
            <news-headline v-if="stockNews[0]" @handle-click="routeToNewsDetail" :id="stockNews[0]._id">
              <news-image :src="stockNews[0].image_url" />
              <news-text-box>
                <news-text-box-title>
                  {{ stockNews[0].title }}
                </news-text-box-title>
                <news-text-box-desc
                  :author="stockNews[0].source"
                  :publishDate="stockNews[0].date"
                  :replyCount="stockNews[0].replyCount"
                />
              </news-text-box>
            </news-headline>
            <news-list-item
              v-for="element in stockNews.slice(1, stockNews.length)"
              :key="element._id"
              @handle-click="routeToNewsDetail"
              :id="element._id"
            >
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="150">
          <loading v-if="newsIsLoading" />
          <error v-else-if="newsIsError" />
          <empty v-else-if="!cryptoNews.length" />
          <news-list v-else>
            <news-headline v-if="cryptoNews[0]" @handle-click="routeToNewsDetail" :id="stockNews[0]._id">
              <news-image :src="cryptoNews[0].image_url" />
              <news-text-box>
                <news-text-box-title>
                  {{ cryptoNews[0].title }}
                </news-text-box-title>
                <news-text-box-desc
                  :author="cryptoNews[0].source"
                  :publishDate="cryptoNews[0].date"
                  :replyCount="cryptoNews[0].replyCount"
                />
              </news-text-box>
            </news-headline>
            <news-list-item
              v-for="element in cryptoNews.slice(1, cryptoNews.length)"
              :key="element._id"
              @handle-click="routeToNewsDetail"
              :id="element._id"
            >
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
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
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';
import Empty from 'karl/frontend/components/Empty.vue';

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
    Loading,
    Error,
    Empty,
  },

  computed: {
    ...mapState({
      news: (state) => state.article.news,
      hotNews: (state) => state.article.hotNews,

      newsIsLoading: (state) => state.article.newsIsLoading,
      newsIsError: (state) => state.article.newsIsError,
      hotNewsIsLoading: (state) => state.article.hotNewsIsLoading,
      hotNewsIsError: (state) => state.article.hotNewsIsError,

      userInfo: (state) => state.user,
    }),

    ...mapGetters('article', {
      stockNews: 'stockNews',
      cryptoNews: 'cryptoNews',
    }),

    firstNews() {
      return this.news[0];
    },

    firstHotNews() {
      return this.hotNews[0];
    },
  },

  data() {
    const { MARKET, NEWS, BOOKMARK, LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY } = text;

    return {
      swiperNavigatorButtonNames: [LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK],
    };
  },

  methods: {
    ...mapActions('article', ['getNews', 'getHotNews', 'setNewsIsLoading', 'setHotNewsIsLoading']),
    ...mapActions('user', ['getUser']),

    routeToNewsDetail(id) {
      this.$router.push({ path: 'news-detail', query: { id } });
    },
  },

  async mounted() {
    const { userEmail, userGoogleId } = this.userInfo;
    this.setNewsIsLoading(true);

    if (!userEmail || !userGoogleId) {
      await this.getUser();
    }

    this.getNews().then(() => {
      this.setNewsIsLoading(false);
    });

    this.getHotNews().then(() => {
      this.setHotNewsIsLoading(false);
    });
  },
};
</script>

<style scoped lang="scss">
.news-image-align {
  display: flex;
  align-self: center;
}
</style>
