<template>
  <section id="news-main-list" class="section">
    <Card v-for="{ category, datetime, headline, id, image, source, summary, url } in newsList" :key="id">
      {{ headline }}

      {{ summary }}
    </Card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/molecules/News.List.Card.vue';

export default Vue.extend({
  name: 'NewsList',

  components: { Card },

  props: {
    newsList: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
#news-main-list {
  width: 100%;
  min-height: 300px;
}
</style>
