<template>
  <ReplyForm v-if="isValid" @change-current-input="inputToggle" />
  <div v-else id="reply-open" class="card noselect" @click="inputToggle(inputId)">
    <Words :class="formDisabled">댓글 달기</Words>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import TextArea from '@/components/atoms/TextArea.vue';
import ReplyForm from '@/components/molecules/ReplyInputForm.vue';

export default Vue.extend({
  components: { Words, TextArea, ReplyForm },

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

  computed: {
    isValid() {
      return this.$store.getters.getAuth && this.curInputId === this.inputId;
    },

    formDisabled() {
      return this.isValid ? '' : 'disabled';
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
  .disabled {
    cursor: not-allowed;
  }
}
</style>
