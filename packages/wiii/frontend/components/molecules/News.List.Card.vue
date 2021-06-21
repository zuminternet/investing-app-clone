<template>
  <article class="news-list-card card" :data-id="idx">
    <Words class="news-list-card-title">{{ headline }} </Words>
    <LazyImages :src="image" :alt="headline" class="news-list-card-thumbnail" />
    <div class="news-list-card-tags noselect">
      <Words class="news-list-card-tag news-list-card-category" :class="categoryColor"> {{ category.toUpperCase() }} </Words>
      <Words class="news-list-card-tag news-list-card-source"> {{ source }} </Words>
      <Words class="news-list-card-tag news-list-card-date">{{ dateString }} </Words>
      <Words class="news-list-card-tag news-list-card-likes" :class="{ userLiked }"> 🏷️ {{ likes }} </Words>
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
    idx: {
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
    likes: {
      type: Number,
      default: 0,
    },
    userLiked: {
      type: Boolean,
      default: false,
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

    .dark & {
      color: rgba($neon-green, 0.6);
    }
  }

  &-thumbnail {
    width: 85%;
    margin: 10px auto;
    border-radius: $border-radius-10;
    box-shadow: 0 0 5px 0 $grey-500;

    .loading {
      min-width: 100px;
      min-height: 100px;
    }
  }

  &-tags {
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &-tag {
    padding: 0 10px;
    width: max-content;
    overflow: visible;
    border-radius: $border-radius-10;
    font-size: 0.8rem;
    line-height: 1.1rem;
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

  &-likes {
    color: $grey-700;
    background-color: rgba($grey-500, 0.2);

    .dark & {
      color: $grey-300;
    }

    &.userLiked {
      background-color: rgba($red-a400, 0.4);
    }
  }
}
</style>
