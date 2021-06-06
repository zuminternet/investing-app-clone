<template>
  <article class="card reply" ref="card">
    <div class="reply-info">
      <img :data-src="userThumbnail" alt="😎" class="thumbnail" />
      <Words class="mini bold"> {{ userName }} </Words>
      <Words class="mini"> {{ date }} </Words>
    </div>
    <Words> {{ contents }} </Words>
    <Words class="mini"> + {{ likes }} </Words>
  </article>
</template>

<script lang="ts">
/**
 * Semantic UI > comments 참고, slack과 유사한 Ui
 * @see https://semantic-ui.com/views/comment.html
 */

import Vue from 'vue';
import Words from '@/components/atoms/Words';

export default Vue.extend({
  name: 'ReplyCard',

  components: { Words },

  /**
   * @see @/components/organisms/ReplySection
   * @property replId
   * @property userThumbnail
   * @property userName
   * @property date
   * @property contents
   * @property likes
   */
  props: {
    replId: {
      type: [String, Number],
    },
    userThumbnail: {
      type: String,
      default: 'https://loremflickr.com/g/150/150/panda',
    },
    userName: {
      type: String,
    },
    date: {
      type: [String, Date],
    },
    contents: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    /** lazy-loading for thumbnails */
    const card = this.$refs.card;
    const io = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;

        const img = target.getElementsByTagName('img')[0];
        if (!img?.dataset?.src) continue;

        img.src = img.dataset.src;
        img.removeAttribute('data-imgsrc');

        io.disconnect();
      }
    });
    io.observe(card);
  },
});
</script>

<style lang="scss" scoped>
.reply {
  display: flex;
  flex: 1 1 0;
  justify-content: flex-start;
  align-items: flex-start;

  .thumbnail {
    width: fit-content;
    height: fit-content;
    max-width: 50px;
    max-height: 50px;
  }

  &-info {
    width: 100%;
    display: flex;
    flex: 1;
    justify-content: space-between;

    .bold {
      font-weight: bold;
    }
  }
}
</style>
