<template>
  <form id="reply-input" class="card" @submit.prevent="() => submitReply()">
    <TextArea id="reply-input-text" @change-text-handler="changeReplyInput" :newText="replyText" />
    <div id="buttons">
      <Button id="reply-input-cancel" type="reset" @click.native="resetInput">Cancel</Button>
      <Button id="reply-input-submit" type="submit" :disabled="replyText.length === 0">Save</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import TextArea from '@/components/atoms/TextArea.vue';
import Button from '@/components/atoms/Button.vue';
import { StoreNames } from '@/store';
// import debounce from '@/utils/debounce';

export default Vue.extend({
  data() {
    return {
      replyText: '',
    };
  },

  components: { TextArea, Button },

  computed: {
    ...mapGetters(['getTicker']),
    ticker() {
      return this.getTicker;
    },
  },

  methods: {
    ...mapActions(StoreNames.Reply, ['insertReply']),

    resetInput() {
      this.replyText = '';
      this.$emit('change-current-input', 'none');
    },

    changeReplyInput(event) {
      this.replyText = event.target.value;
    },

    /**
     * debounce 적용해 한번만 쿼리 전송되도록
     * @todo debounce 함수 제대로 안만들어진건지 alert 계속 실행되는 문제..
     */
    async submitReply() {
      const isInserted = await this.insertReply({ contents: this.replyText });
      /** @todo 실패 UI */
      if (!isInserted) return;

      this.resetInput();
      this.$emit('after-submit');
    },
  },
});
</script>

<style lang="scss" scoped>
#reply-input {
  width: 100%;
  padding: 3% 5% 2% 5%;
  display: flex;
  flex-direction: column;

  #buttons {
    width: 100%;
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
    cursor: default;
  }

  &-submit:not(:disabled) {
    background-color: $green-500;
    border: solid 2px $green-500;
    color: $white-900;

    &:hover {
      background-color: $blue-700;
      border: solid 2px $blue-700;
    }
  }

  &-cancel {
    background-color: $red-a400;
    border: solid 2px $red-a400;
    color: $white-900;
  }
}
</style>
