<template>
  <section id="news-main-list" class="section">
    <Words class="subtitle">{{ categoryTitle }}</Words>
    <div class="news-main-list-cols">
      <li class="news-main-list-col">
        <Card
          v-for="({ id, ...rest }, idx) in newsList"
          v-show="idx % 2 === 0"
          :key="idx"
          v-bind="{ id, ...rest }"
          class="news-list-card"
        />
      </li>
      <li class="news-main-list-col">
        <Card
          v-for="({ id, ...rest }, idx) in newsList"
          v-show="idx % 2 === 1"
          :key="idx"
          v-bind="{ id, ...rest }"
          class="news-list-card"
        />
      </li>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Card from '@/components/molecules/News.List.Card.vue';
import { marketEnum } from '../../../domain/newsData';

export default Vue.extend({
  name: 'NewsList',

  components: { Words, Card },

  props: {
    newsList: {
      type: Array,
      default: () => [],
    },

    category: {
      type: String,
      default: marketEnum.general,
    },
  },

  computed: {
    categoryTitle() {
      return this.category === marketEnum.general ? '시장 뉴스' : '코인 뉴스';
    },
  },
});
</script>

<style lang="scss" scoped>
#news-main-list {
  .news-main-list-cols {
    width: 100%;
    min-height: 300px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .news-main-list-col {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      width: 49%;
      height: 100%;
    }

    .news-list-card {
      width: 100%;
    }
  }
}
</style>
