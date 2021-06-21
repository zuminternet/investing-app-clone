<template>
  <div id="news-modal" @click="$emit('set-modal-handler')">
    <article id="news-modal-detail">
      <img :src="image" :alt="image" id="news-modal-detail-image" />
      <Words id="news-modal-detail-headline">{{ headline }}</Words>
      <Words id="news-modal-detail-summary">{{ summary }}</Words>
      <Words id="news-modal-detail-source">{{ source }}</Words>
      <Words @click.native="openOrigin" id="news-modal-detail-origin">원문보기</Words>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import Words from '@/components/atoms/Words.vue';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.News);

export default Vue.extend({
  name: 'NewsModal',

  components: { Words },

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
    padding: 30px;
    width: 80%;
    height: max-content;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey-300;
    border-radius: $border-radius-10;

    &-image {
      width: 80%;
    }

    &-headline {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}
</style>
