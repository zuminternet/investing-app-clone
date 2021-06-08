<template>
  <ReplyForm v-if="curInputId === inputId" @change-current-input="inputToggle" />
  <div v-else id="reply-open" class="card noselect" @click="inputToggle(inputId)">
    <Words>댓글 달기</Words>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '../atoms/Words';
import ReplyForm from './ReplyInputForm';

export default Vue.extend({
  components: { Words, ReplyForm },

  props: {
    curInputId: {
      type: String,
    },
  },

  data() {
    return {
      inputId: 'newReply',
    };
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
