<template>
  <article class="card reply" ref="card">
    <div class="reply-info">
      <div class="reply-info-user">
        <img :data-src="userThumbnail" alt="😎" class="thumbnail noselect" />
        <div class="reply-info-user-detail">
          <Words class="mini bold"> {{ userName }} </Words>
          <Words class="mini"> {{ date }} </Words>
        </div>
      </div>
    </div>
    <Words class="reply-content"> {{ contents }} </Words>
    <div class="reply-reaction noselect">
      <button class="reply-likes">👍 {{ likes }}</button>
      <button class="reply-rerepl">대댓글 달기</button>
    </div>
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
$paddingTop: 5px;
$maxHeight: 50px;

.reply {
  width: 100%;
  padding: 3% 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .thumbnail {
    width: fit-content;
    height: fit-content;
    max-width: $maxHeight;
    max-height: $maxHeight;
    background-position: center;
    background-size: cover;
    border-radius: 50px;
  }

  &-info {
    width: 100%;
    height: 100%;
    max-height: $maxHeight;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 3px 0;
    }

    &-user {
      width: max-content;
      display: flex;
      flex-wrap: row nowrap;
      align-items: center;

      &-detail {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .bold {
      font-weight: bold;
    }
  }

  &-content {
    width: 100%;
    padding-top: $paddingTop;
    text-align: left;
    word-wrap: break-word;
  }

  &-reaction {
    width: 100%;
    padding-top: $paddingTop;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;

    button {
      background-color: $grey-300;
      height: 30px;
      width: max-content;
      border: none;
      border-radius: 10px;
      font-size: 0.7rem;
      line-height: 1rem;
      cursor: pointer;
    }

    .reply-likes {
      text-align: center;
      font-weight: bold;
      color: $neon-crimson;
    }
  }
}
</style>
