<template>
  <article class="card news-list-card">
    <Words>{{ category }} </Words>
    <LazyImages :src="image" :alt="headline" class="news-list-card-thumbnail" />
    <Words class="news-list-card-title">{{ headline }} </Words>
    <Words>{{ summary }} </Words>
    <Words>{{ url }} </Words>
    <Words>{{ source }} </Words>
    <Words>{{ dateString }} </Words>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import LazyImages from '@/components/atoms/LazyImages.vue';
import Card from '@/components/molecules/Card.vue';
import { getDateString } from '../../../domain/date';

export default Vue.extend({
  name: 'NewsListCard',

  components: { Words, Card, LazyImages },

  props: {
    id: {
      type: Number,
    },
    category: {
      type: String,
    },
    headline: {
      type: String,
    },
    image: {
      type: String,
    },
    source: {
      type: String,
    },
    summary: {
      type: String,
    },
    datetime: {
      type: Number,
    },
    url: {
      type: String,
    },
  },

  computed: {
    dateString() {
      /** datetime; UNIX timestamp 이므로 1_000 곱해줘야 함 */
      return getDateString(this.datetime * 1000);
    },
  },
});
</script>

<style lang="scss" scoped>
.news-list-card {
  &-title {
    font-weight: bold;
    font-size: 1.2rem;
  }

  &-thumbnail {
    width: 100%;
    margin: 10px;
    border-radius: $border-radius-10;

    .loading {
      min-width: 100px;
      min-height: 100px;
    }
  }
}
</style>
