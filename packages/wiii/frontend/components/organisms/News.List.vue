<template>
  <section id="news-main-list" class="section">
    <Words class="subtitle">{{ categoryTitle }}</Words>
    <div class="news-main-list-cols" @click="setModalOpen">
      <li class="news-main-list-col">
        <Card
          v-for="({ id, ...rest }, idx) in newsList"
          v-show="idx % 2 === 0"
          :key="idx"
          v-bind="{ id, idx, ...rest }"
          class="news-list-card"
        />
      </li>
      <li class="news-main-list-col">
        <Card
          v-for="({ id, ...rest }, idx) in newsList"
          v-show="idx % 2 === 1"
          :key="idx"
          v-bind="{ id, idx, ...rest }"
          class="news-list-card"
        />
      </li>
    </div>
    <Modal v-show="isModalOpen" @set-modal-handler="setModalOpen" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import Words from '@/components/atoms/Words.vue';
import Card from '@/components/molecules/News.List.Card.vue';
import Modal from '@/components/molecules/News.Modal.vue';
import { marketEnum } from '../../../domain/newsData';
import { StoreNames } from '@/store';

const { mapActions } = createNamespacedHelpers(StoreNames.News);

export default Vue.extend({
  name: 'NewsList',

  components: { Words, Card, Modal },

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

  data() {
    return {
      isModalOpen: false,
    };
  },

  computed: {
    categoryTitle() {
      return this.category === marketEnum.general ? '시장 뉴스' : '코인 뉴스';
    },
  },

  methods: {
    ...mapActions(['setModalNewsAction']),

    setModalOpen(e) {
      const id = e?.target?.closest('article[data-id]');
      if (!e || !id) {
        this.isModalOpen = false;
        this.setModalNewsAction({});
        return;
      }

      this.isModalOpen = true;
      this.setModalNewsAction(this.newsList[id.getAttribute('data-id')]);
    },
  },
});
</script>

<style lang="scss" scoped>
#news-main-list {
  .subtitle {
    padding-bottom: 10px;
  }

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
