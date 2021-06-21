<template>
  <section id="news-company-list" class="section">
    <Words class="news-company-list-subtitle">뉴스 및 분석</Words>
    <div class="news-company-list-col" :class="{ loading }" @click="setModalOpen">
      <Card
        v-for="({ id, ...rest }, idx) in newsList.slice(0, 5)"
        :key="idx"
        v-bind="{ id, idx, ...rest }"
        class="news-list-card"
      />
    </div>
    <div>더보기</div>
    <Modal v-show="isModalOpen" @set-modal-handler="setModalOpen" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, createNamespacedHelpers } from 'vuex';

import Words from '@/components/atoms/Words.vue';
import Card from '@/components/molecules/News.Company.Card.vue';
import Modal from '@/components/molecules/News.Modal.vue';

import { StoreNames } from '@/store';
import { getDateString, WEEK_ONE } from '../../../domain/date';

const { mapActions } = createNamespacedHelpers(StoreNames.News);

const today = new Date().getTime();
const dateFrom = getDateString(today - WEEK_ONE * 2);
const dateTo = getDateString(today);

export default Vue.extend({
  name: 'NewsCompanyList',

  components: { Words, Card, Modal },

  data() {
    return {
      isModalOpen: false,
      loading: true,
      dateFrom,
      dateTo,
      newsList: [],
    };
  },

  computed: {
    ...mapState(['ticker']),
  },

  methods: {
    ...mapActions(['setModalNewsAction', 'getCompanyNewsAction']),

    resetModal() {
      this.isModalOpen = false;
      this.setModalNewsAction({});
    },

    setModalOpen(e) {
      const id = e?.target?.closest('article[data-id]');
      if (!e || !id) return this.resetModal();

      this.isModalOpen = true;
      const newsData = this.newsList[id.getAttribute('data-id')];
      this.setModalNewsAction(newsData);
    },
  },

  async mounted() {
    const { ticker, dateFrom, dateTo } = this;
    this.newsList = await this.getCompanyNewsAction({ symbol: ticker, from: dateFrom, to: dateTo });
    this.loading = false;
  },
});
</script>

<style lang="scss" scoped>
#news-company-list.section {
  width: 100%;
  height: 100%;
  padding: 5px;

  .news-company-list-subtitle {
    padding: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: left;
    color: $grey-700;

    .dark & {
      color: $neon-green;
    }
  }

  .news-company-list-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 95%;
    min-height: 300px;
  }

  .news-list-card {
    width: 100%;
  }
}
</style>
