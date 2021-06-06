<template>
  <div v-if="!isInputOpen" id="reply-open" class="card noselect" @click="inputToggle">
    <Words>댓글 달기</Words>
  </div>
  <form v-else id="reply-input" class="card" @submit.prevent="submitReply">
    <Label :forId="'reply-input-text'">댓글 달기</Label>
    <TextArea id="reply-input-text" @change-text-handler="changeReplyInput" :replyText="replyText" />
    <div id="buttons">
      <Button id="reply-input-cancel" type="reset" @click.native="inputToggle">Cancel</Button>
      <Button id="reply-input-submit" type="submit" :disabled="replyText.length === 0">Save</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Label from '@/components/atoms/Label.vue';
import TextArea from '@/components/atoms/TextArea.vue';
import Button from '@/components/atoms/Button.vue';

export default Vue.extend({
  data() {
    return {
      isInputOpen: false,
      replyText: '',
    };
  },
  components: { Words, Label, TextArea, Button },
  methods: {
    inputToggle() {
      this.replyText = '';
      this.isInputOpen = !this.isInputOpen;
    },

    changeReplyInput(event) {
      this.replyText = event.target.value;
    },

    submitReply() {
      alert(this.replyText);
    },
  },
});
</script>

<style lang="scss" scoped>
#reply-open {
  &,
  p {
    cursor: pointer;
  }

  &:hover {
    background-color: $grey-500;
    color: $grey-100;
  }
}

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