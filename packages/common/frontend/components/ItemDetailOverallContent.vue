<template>
  <div class="item-detail-overall-content" :style="style">
    <!-- 차트 컴포넌트 자리  -->
    <!-- overview 컴포넌트 자리 -->
    <item-detail-overall-info-box :itemDetail="itemDetail"></item-detail-overall-info-box>

    <!-- 댓글 컴포넌트 자리 -->
    <!-- 뉴스 컴포넌트 자리 -->
    <sub-content-box :text="newsText">
      <news-list>
        <news-list-item v-for="element in news" :key="element.id" :to="''">
          <news-image :src="element.image_url" />
          <news-text-box>
            <news-text-box-title>{{ element.title }}</news-text-box-title>
            <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
          </news-text-box>
        </news-list-item>
      </news-list>
    </sub-content-box>

    <!-- 분석 컴포넌트 자리 -->
  </div>
</template>

<script>
import ItemDetailOverallInfoBox from '../components/ItemDetailOverallInfoBox.vue';
import SubContentBox from '../components/ItemDetail/SubContentBox.vue';
import NewsList from '../components/News/NewsList.vue';
import NewsListItem from '../components/News/NewsListItem.vue';
import NewsImage from '../components/News/NewsImage.vue';
import NewsTextBox from '../components/News/NewsTextBox.vue';
import NewsTextBoxTitle from '../components/News/NewsTextBoxTitle.vue';
import NewsTextBoxDesc from '../components/News/NewsTextBoxDesc.vue';

import { text } from '../constants';
export default {
  name: 'ItemDetailOverallContent',
  components: {
    ItemDetailOverallInfoBox,
    NewsList,
    NewsListItem,
    NewsImage,
    NewsTextBox,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    SubContentBox,
  },
  props: {
    itemDetail: {
      type: Object,
      required: true,
    },

    news: {
      type: Array,
      required: true,
    },

    excludingHeight: {
      type: Number,
      default: 150,
    },
  },

  computed: {
    style() {
      return {
        height: `calc(100vh - ${this.excludingHeight}px)`,
      };
    },
  },

  data() {
    const { NEWS, ANALYSIS, OPINION } = text;

    return {
      newsText: NEWS,
      analysisText: ANALYSIS,
      opnionText: OPINION,
    };
  },
};
</script>

<style scoped lang="scss">
.item-detail-overall-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.item-detail-overall-content::-webkit-scrollbar {
  display: none;
}
</style>
