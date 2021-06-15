<template>
  <ReplyForm v-if="isValid" @change-current-input="inputToggle" @after-submit="$emit('after-submit')" />
  <div v-else id="reply-open" class="card noselect" :class="{ disabled: !hasAuth }" @click="inputToggle(inputId)">
    <Words class="reply-valid-text"> {{ validText }} </Words>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '../atoms/Words.vue';
import ReplyForm from './ReplyInputForm.vue';

export default Vue.extend({
  components: { Words, ReplyForm },

  props: {
    curInputId: {
      type: String,
      required: true,
    },
    hasAuth: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      inputId: 'newReply',
    };
  },

  computed: {
    isValid() {
      const { curInputId, inputId } = this;
      return this.hasAuth && curInputId === inputId;
    },

    formDisabled() {
      return this.hasAuth ? '' : 'disabled';
    },

    validText() {
      return this.hasAuth ? `댓글 달기` : `댓글 달기는 로그인이 필요합니다`;
    },
  },

  methods: {
    inputToggle(id) {
      if (!this.hasAuth) return this.$router.push(`/user/login`);
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
    background-color: rgba(158, 158, 158, 1);
    color: rgba(245, 245, 245, 1);
  }
}
</style>
