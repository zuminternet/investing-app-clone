<template>
  <div v-if="!isInputOpen" id="reply-open" class="card noselect" @click="inputToggle">
    <Words>댓글 달기</Words>
  </div>
  <form v-else="isInputOpen" id="reply-input" class="card" @submit.prevent="submitReply">
    <Label :forId="'reply-input-text'">댓글 달기</Label>
    <TextArea id="reply-input-text" @change-text-handler="changeReplyInput" :replyText="replyText" />
    <Button id="reply-input-submit" type="submit" :disabled="replyText.length === 0">Save</Button>
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

  &-submit:hover:not(:disabled) {
    background-color: $blue-700;
    border: solid 2px $blue-700;
    color: $grey-100;
  }
}
</style>