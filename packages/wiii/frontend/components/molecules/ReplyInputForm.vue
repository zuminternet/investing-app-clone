<template>
  <form id="reply-input" class="card" @submit.prevent="submitReply">
    <TextArea id="reply-input-text" @change-text-handler="changeReplyInput" :replyText="replyText" />
    <div id="buttons">
      <Button id="reply-input-cancel" type="reset" @click.native="cancelInput">Cancel</Button>
      <Button id="reply-input-submit" type="submit" :disabled="replyText.length === 0">Save</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import TextArea from '@/components/atoms/TextArea.vue';
import Button from '@/components/atoms/Button.vue';

export default Vue.extend({
  data() {
    return {
      replyText: '',
    };
  },

  components: { TextArea, Button },

  methods: {
    cancelInput() {
      this.replyText = '';
      this.$emit('change-current-input', 'none');
    },

    changeReplyInput(event) {
      this.replyText = event.target.value;
    },

    submitReply() {
      const replyText = this.replyText;
      this.cancelInput();
      alert(replyText);
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