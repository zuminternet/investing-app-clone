<template>
  <section class="section">
    <Card
      v-for="{ replId, title, contents, date, user } in repls"
      :key="replId"
      :replId="replId"
      :title="title"
      :contents="contents"
      :date="date"
      :user="user"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

import Words from '@/components/atoms/Words';
import Card from '@/components/molecules/ReplyCard';

export default Vue.extend({
  name: 'ReplySection',

  components: { Card, Words },

  computed: {
    repls() {
      return this.getRepls();
    },
  },

  methods: {
    /** @todo vuex에서 데이터 가져오기 */
    getRepls() {
      /** dummies */
      return [
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
        { replId: 'dfgf3w', title: ' hello', contents: '댓글댓글', date: `2021-06-01`, user: 3434 },
      ];
    },
  },
});
</script>
