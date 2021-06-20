<template>
  <article class="news-list-card card">
    <Words class="news-list-card-title">{{ headline }} </Words>
    <LazyImages :src="image" :alt="headline" class="news-list-card-thumbnail" />
    <Words class="news-list-card-summary">{{ summary }} </Words>
    <div class="news-list-card-tags noselect">
      <Words class="news-list-card-tag news-list-card-category" :class="categoryColor"> {{ category.toUpperCase() }} </Words>
      <Words class="news-list-card-tag news-list-card-source"> {{ source }} </Words>
      <Words class="news-list-card-tag news-list-card-date">{{ dateString }} </Words>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import LazyImages from '@/components/atoms/LazyImages.vue';
import Card from '@/components/molecules/Card.vue';
import { getDateString } from '../../../domain/date';

const categoryColors = {
  'top news': 'top',
  business: 'business',
};

export default Vue.extend({
  name: 'NewsListCard',

  components: { Words, Card, LazyImages },

  props: {
    id: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    headline: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    source: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
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

    categoryColor() {
      return categoryColors[this.category];
    },
  },
});
</script>

<style lang="scss" scoped>
.news-list-card {
  &.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
  }

  &-title {
    font-weight: bold;
    font-size: 1.2rem;
  }

  &-thumbnail {
    width: 100%;
    margin: 10px 0;
    border-radius: $border-radius-10;

    .loading {
      min-width: 100px;
      min-height: 100px;
    }
  }

  &-tags {
    padding-top: 15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &-tag {
    width: max-content;
    overflow: visible;
    padding: 0 10px;
    border-radius: $border-radius-10;
    font-size: 0.8rem;
    color: $grey-300;
    cursor: default;
  }

  &-category {
    &.top {
      background-color: $blue-900;
    }

    &.business {
      background-color: $red-700;
    }
  }

  &-source {
    background-color: $shallow-blue;
  }

  &-date {
    background-color: $grey-700;
  }
}
</style>
