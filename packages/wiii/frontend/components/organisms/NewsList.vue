<template>
  <section class="section">
    <Card>
      News 기사 영역
    </Card>
    <Card>
      News 기사 영역
    </Card>
    <Card>
      News 기사 영역
    </Card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/molecules/Card.vue';

export default Vue.extend({
  name: 'ReplySection',

  components: { Card },

  methods: {
    // vuex에서 데이터 가져오기
    getNews() {
      //
    },
  },
});
</script>
