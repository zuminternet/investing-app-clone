<template>
  <section class="section">
    <Card
      v-for="{ replId, userThumbnail, userName, contents, date, likes } in repls"
      :key="replId"
      v-bind="{ userThumbnail, userName, contents, date, likes }"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Words from '@/components/atoms/Words';
import Card from '@/components/molecules/ReplyCard';

export default Vue.extend({
  name: 'ReplySection',

  components: { Card, Words },

  data() {
    return {
      repls: [],
    };
  },

  async mounted() {
    this.repls = await this.getRandRepls();
  },

  methods: {
    ...mapActions('Reply', ['getRandomRepls']),
    /**
     * @todo vuex에서 데이터 가져오기
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
  },
});
</script>
