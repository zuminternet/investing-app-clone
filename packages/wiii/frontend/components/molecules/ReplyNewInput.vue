<template>
  <ReplyForm v-if="isValid" @change-current-input="inputToggle" @after-submit="$emit('after-submit')" />
  <div v-else id="reply-open" class="card noselect" :class="{ disabled: !hasAuth }" @click="inputToggle(inputId)">
    <Words class="reply-valid-text"> {{ validText }} </Words>
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
    hasAuth() {
      return this.$store.getters.getAuth;
    },

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

.disabled {
  cursor: not-allowed;
}

.reply-valid-text {
  font-style: oblique;
  font-size: 0.8rem;
}
</style>
