<template>
  <section class="section">
    <ReplySort @change-sort="changeSort" :sortText="sortText" />
    <ReplyInput v-bind="{ curInputId }" @change-current-input="changeCurInput" @after-submit="afterSubmit" />
    <Card v-for="(repl, idx) in repls" :key="idx" v-bind="{ ...repl, curInputId }" @change-current-input="changeCurInput" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ReplyInput from '@/components/molecules/ReplyNewInput.vue';
import ReplySort from '@/components/molecules/ReplySort.vue';
import Card from '@/components/molecules/ReplyCard.vue';
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
    this.sortText = this.sortTexts[this.sortIdx];
    this.repls = await this.getReplsByDocID(this.ticker);
  },

  methods: {
    ...mapActions(StoreNames.Reply, ['getRandomRepls', 'getReplsByDocID']),

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
      this.repls = this.repls.sort((a, b) => (this.sortIdx === 0 ? b.updatedAt - a.updatedAt : b.likes - a.likes));
    },

    changeCurInput(idx: string) {
      this.curInputId = idx;
    },

    async afterSubmit() {
      this.repls = await this.getReplsByDocID(this.ticker);
    },
  },
});
</script>
