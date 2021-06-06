<template>
  <ReplyForm v-if="curInputId === inputId" @change-current-input="inputToggle" />
  <div v-else id="reply-open" class="card noselect" @click="inputToggle(inputId)">
    <Words>댓글 달기</Words>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Label from '@/components/atoms/Label.vue';
import TextArea from '@/components/atoms/TextArea.vue';
import Button from '@/components/atoms/Button.vue';
import ReplyForm from '@/components/molecules/ReplyInputForm.vue';

export default Vue.extend({
  data() {
    return {
      inputId: 'newReply',
    };
  },

  components: { Words, Label, TextArea, Button, ReplyForm },

  props: {
    curInputId: {
      type: String,
    },
  },

  methods: {
    inputToggle(id) {
      this.$emit('change-current-input', id);
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
</style>