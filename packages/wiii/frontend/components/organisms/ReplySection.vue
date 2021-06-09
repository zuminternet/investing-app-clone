<template>
  <section class="section">
    <ReplySort @change-sort="changeSort" :sortText="sortText" />
    <ReplyInput v-bind="{ curInputId }" @change-current-input="changeCurInput" />
    <Card
      v-for="{ replId, userThumbnail, userName, contents, date, likes } in repls"
      :key="replId"
      v-bind="{ replId, userThumbnail, userName, contents, date, likes, curInputId }"
      @change-current-input="changeCurInput"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ReplyInput from '@/components/molecules/ReplyNewInput';
import ReplySort from '@/components/molecules/ReplySort';
import Card from '@/components/molecules/ReplyCard';
import { StoreNames } from '@/store';

export default Vue.extend({
  name: 'ReplySection',

  components: { ReplyInput, ReplySort, Card },

  props: {
    ticker: {
      type: String,
    },
  },

  data() {
    const sortTexts = ['최신순', '좋아요순'];
    return {
      repls: [],
      sortIdx: 0,
      sortText: sortTexts[0],
      sortTexts,
      curInputId: 'none',
    };
  },

  async mounted() {
    // this.repls = await this.getRandRepls();
    this.sortText = this.sortTexts[this.sortIdx];
  },

  methods: {
    ...mapActions(StoreNames.Reply, ['getRandomRepls']),
    /**
     * @todo vuex에서 데이터 가져오기 by ticker
     * @property replId
     * @property userThumbnail
     * @property userName
     * @property date
     * @property contents
     * @property likes
     */
    async getRandRepls() {
      try {
        const result = await this.getRandomRepls();
        if (!result?.length) throw new Error('No Result');
        return result;
      } catch (e) {
        console.error(e);
      }
    },

    changeSort() {
      this.sortIdx = (this.sortIdx + 1) % 2;
      this.sortText = this.sortTexts[this.sortIdx];
      this.repls = this.repls.sort((a, b) => (this.sortIdx === 0 ? b.date - a.date : b.likes - a.likes));
    },

    changeCurInput(idx: string) {
      this.curInputId = idx;
    },
  },
});
</script>
