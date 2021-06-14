<template>
  <form id="reply-input" class="card" @submit.prevent="submitReply">
    <TextArea id="reply-input-text" :newText="replyText" @change-text-handler="changeReplyInput" />
    <div id="buttons">
      <Button id="reply-input-cancel" type="reset" @click.native="cancelInput">Cancel</Button>
      <Button id="reply-input-submit" type="submit" :disabled="replyText.length === 0">Save</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

export default Vue.extend({
  components: { TextArea, Button },

  data() {
    return {
      replyText: '',
    };
  },

  methods: {
    cancelInput() {
      this.replyText = '';
      this.$emit('change-current-input', 'none');
    },

    changeReplyInput(event) {
      this.replyText = event.target.value;
    },

    submitReply() {
      this.cancelInput();
      alert(this.replyText);
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
    background-color: rgba(0, 150, 136, 1);
    border: solid 2px rgba(0, 150, 136, 1);
    color: hsla(0, 0%, 100%, 1);

    &:hover {
      background-color: rgba(25, 118, 210, 1);
      border: solid 2px rgba(25, 118, 210, 1);
    }
  }

  &-cancel {
    background-color: rgba(255, 23, 68, 1);
    border: solid 2px rgba(255, 23, 68, 1);
    color: hsla(0, 0%, 100%, 1);
  }
}
</style>
