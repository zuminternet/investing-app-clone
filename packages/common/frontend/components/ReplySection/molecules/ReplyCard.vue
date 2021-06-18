<template>
  <article ref="card" class="card reply">
    <div class="reply-info">
      <div class="reply-info-user">
        <img :data-src="userThumbnail" alt="😎" class="thumbnail noselect" />
        <div class="reply-info-user-detail">
          <Words class="mini bold"> {{ userName }} </Words>
          <Words class="mini"> {{ dateString }} </Words>
        </div>
      </div>
    </div>
    <Words class="reply-content"> {{ contents }} </Words>
    <div class="reply-reaction noselect">
      <Button class="reply-likes" :class="{ 'reply-likes-added': liked }" @click.native="toggleLikes"
        >👍 {{ changableLikes }}</Button
      >
    </div>
  </article>
</template>

<script lang="ts">
/**
 * Semantic UI > comments 참고, slack과 유사한 Ui
 * @see https://semantic-ui.com/views/comment.html
 */
import Vue from 'vue';
import { mapActions } from 'vuex';
import Button from '../atoms/Button.vue';
import Words from '../atoms/Words.vue';
import lazyloading from '../../../utils/lazyloading';

export default Vue.extend({
  name: 'ReplyCard',

  components: { Button, Words },

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
      default: 'https://picsum.photos/200',
    },
    userName: {
      type: String,
    },
    updatedAt: {
      type: Date,
    },
    contents: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
    },
    userLike: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      liked: this.userLike,
      changableLikes: this.likes,
    };
  },

  computed: {
    dateString() {
      const { updatedAt } = this;
      return `'${updatedAt
        .getFullYear()
        .toString()
        .slice(-2)}/${(updatedAt.getMonth() + 1).toString().padStart(2, '0')}/${updatedAt
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    },
  },

  mounted() {
    lazyloading(this.$refs.card);
  },

  methods: {
    ...mapActions('reply', ['toggleLikesAction']),

    toggleLikes() {
      /** @todo 예외처리 */
      if (!this.email) return;
      const { replId, liked, changableLikes } = this;
      this.liked = !liked;
      this.changableLikes = liked ? changableLikes - 1 : changableLikes + 1;
      this.toggleLikesAction({ replId, likes: this.changableLikes });
    },
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

        p {
          margin: 3px 0;
        }
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
      width: max-content;
      font-size: 0.7rem;
    }

    .reply-likes {
      text-align: center;
      font-weight: bold;
      color: rgba(249, 0, 79, 1);

      &-added {
        background-color: rgba(255, 23, 68, 0.6);
        font-weight: bolder;
      }
    }
  }
}
</style>
