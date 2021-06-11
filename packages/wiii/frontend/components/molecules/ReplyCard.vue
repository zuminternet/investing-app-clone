<template>
  <article class="card reply" ref="card">
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
      <Button class="reply-likes">👍 {{ likes }}</Button>
      <Button class="reply-rerepl" @click.native="inputToggle(replId)">대댓글 달기</Button>
    </div>
    <ReplyForm v-if="curInputId === replId" @change-current-input="inputToggle" />
  </article>
</template>

<script lang="ts">
/**
 * Semantic UI > comments 참고, slack과 유사한 Ui
 * @see https://semantic-ui.com/views/comment.html
 */
import Vue from 'vue';
import Button from '@/components/atoms/Button';
import Words from '@/components/atoms/Words';
import ReplyForm from '@/components/molecules/ReplyInputForm';
import lazyloading from '@/utils/lazyloading';

export default Vue.extend({
  name: 'ReplyCard',

  components: { Button, Words, ReplyForm },

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
    userMail: {
      type: String,
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
    curInputId: {
      type: String,
    },
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
    const card = this.$refs.card;
    lazyloading(card);
  },

  methods: {
    inputToggle(id: string | number) {
      this.$emit('change-current-input', id);
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
      color: $neon-crimson;
    }
  }
}
</style>
