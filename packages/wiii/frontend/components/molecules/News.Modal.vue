<template>
  <div id="news-modal" @click.self="$emit('set-modal-handler')">
    <article id="news-modal-detail">
      <Button id="news-modal-detail-close" @click.native="$emit('set-modal-handler')">❌</Button>
      <img :src="image" :alt="image" id="news-modal-detail-image" />
      <Words id="news-modal-detail-headline">{{ headline }}</Words>
      <Words id="news-modal-detail-summary">{{ summary }}</Words>
      <Words @click.native="openOrigin" id="news-modal-detail-origin"> 원문보기 ➡️ {{ source }} </Words>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { StoreNames } from '@/store';

import Button from '@/components/atoms/Button.vue';
import Words from '@/components/atoms/Words.vue';

const { mapState } = createNamespacedHelpers(StoreNames.News);

export default Vue.extend({
  name: 'NewsModal',

  components: { Words, Button },

  data() {
    return {
      id: undefined,
      headline: undefined,
      image: undefined,
      summary: undefined,
      source: undefined,
      url: undefined,
      datetime: undefined,
    };
  },

  computed: {
    ...mapState(['currentModalNews']),
  },

  watch: {
    currentModalNews() {
      const { id, headline, image, summary, source, url, datetime } = this.currentModalNews;

      this.id = id;
      this.headline = headline;
      this.image = image;
      this.summary = summary;
      this.source = source;
      this.url = url;
      this.datetime = datetime;
    },
  },

  methods: {
    openOrigin() {
      window.open(this.url);
    },
  },
});
</script>

<style lang="scss" scoped>
#news-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($grey-900, 0.8);

  &-detail {
    position: relative;
    padding: 30px;
    width: 60%;
    height: max-content;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey-300;
    border-radius: $border-radius-10;
    box-shadow: 0 0 5px 0 rgba($grey-700, 0.7);
    animation: showUp 0.3s ease-in-out;

    .dark & {
      background-color: $deep-dark;
    }

    &-close {
      position: absolute;
      top: 30px;
      right: 25px;
      width: max-content;
      padding: 5px 10px;
      margin-bottom: 15px;
      cursor: pointer;
      background-color: transparent;

      &:hover {
        color: $grey-100;
        text-decoration: none;
        scale: 1.25;
      }
    }

    &-image {
      width: 80%;
      border-radius: $border-radius-10;
      box-shadow: 0 0 10px 0 rgba($grey-700, 0.7);
    }

    &-headline {
      margin: $margin-padding-15;
      font-weight: bold;
      font-size: 1.2rem;

      .dark & {
        color: $sup-beige;
      }
    }

    &-summary {
      margin-bottom: $margin-padding-15;

      .dark & {
        color: $grey-300;
      }
    }

    &-origin {
      width: max-content;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: $border-radius-10;
      box-shadow: 0 0 3px 0 $grey-500;
      font-size: 0.8rem;
      font-weight: bold;
      transition: all 0.1s ease-in-out;

      &:hover {
        background-color: $green-700;
        color: $grey-100;
        scale: 1.1;

        .dark & {
          background-color: $deep-blue;
        }
      }

      .dark & {
        color: $grey-500;
      }
    }
  }
}

@keyframes showUp {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
