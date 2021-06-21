<template>
  <article class="news-company-card card" :data-id="idx">
    <LazyImages :src="image" :alt="''" class="news-company-card-thumbnail" />
    <div class="news-company-card-texts">
      <Words class="news-company-card-title">{{ headline }} </Words>
      <div class="news-company-card-tags noselect">
        <Words class="news-company-card-tag news-company-card-source"> {{ source }} </Words>
        <Words class="news-company-card-tag news-company-card-date">{{ dateString }} </Words>
        <Words class="news-company-card-tag news-company-card-likes" :class="{ userLiked }"> 🏷️ {{ likes }} </Words>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import LazyImages from '@/components/atoms/LazyImages.vue';
import Card from '@/components/molecules/Card.vue';
import { getDateString } from '../../../domain/date';

export default Vue.extend({
  name: 'NewsCompanyCard',

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
      default: '',
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
  },
});
</script>

<style lang="scss" scoped>
.news-company-card {
  &.card {
    width: 100%;
    padding: 20px;
    height: fit-content;
    max-height: 200px;
    display: grid;
    grid-template-columns: 160px auto;
    column-gap: 15px;
  }

  &-thumbnail {
    width: 100%;
    border-radius: $border-radius-10;
    box-shadow: 0 0 5px 0 $grey-500;
  }

  &-texts {
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  &-title {
    font-weight: bold;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;

    .dark & {
      color: rgba($neon-green, 0.6);
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
    cursor: pointer;
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
