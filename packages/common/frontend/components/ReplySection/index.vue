<template>
  <section class="section">
    <ReplySort :sortText="sortText" @change-sort="changeSort" />
    <ReplyInput v-bind="{ curInputId }" @change-current-input="changeCurInput" @after-submit="afterSubmit" />
    <Card v-for="(repl, idx) in repls" :key="idx" v-bind="{ ...repl, curInputId }" @change-current-input="changeCurInput" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ReplyInput from './molecules/ReplyNewInput.vue';
import ReplySort from './molecules/ReplySort.vue';
import Card from './molecules/ReplyCard.vue';

export default Vue.extend({
  name: 'ReplySection',

  components: { ReplyInput, ReplySort, Card },

  props: {
    docId: {
      type: String,
      required: true,
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
    this.repls = await this.getReplsByDocID();
  },

  methods: {
    ...mapActions('Reply', ['getReplsByDocID']),

    changeSort() {
      this.sortIdx = (this.sortIdx + 1) % 2;
      this.sortText = this.sortTexts[this.sortIdx];
      this.repls = this.repls.sort((a, b) => (this.sortIdx === 0 ? b.date - a.date : b.likes - a.likes));
    },

    changeCurInput(idx: string) {
      this.curInputId = idx;
    },

    async afterSubmit() {
      this.repls = await this.getReplsByDocID();
    },
  },
});
</script>

<style lang="scss" scoped>
.reset {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  transition: all 0.15s ease-out;
}

.center {
  display: grid;
  place-items: center;
}

.boundary {
  @extend .reset;
  @extend .center;

  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;

  background-color: rgba(245, 245, 245, 1);
  color: $grey-700;
}

.section {
  @extend .boundary;

  background-color: transparent;
  padding: 10px 0 10px 0;
}

.card {
  @extend .boundary;

  cursor: pointer;
}

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
