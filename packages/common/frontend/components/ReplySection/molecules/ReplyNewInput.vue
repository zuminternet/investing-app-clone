<template>
  <ReplyForm v-if="isOpen" v-bind="{ docId, email }" @change-current-input="inputToggle" @after-submit="$emit('after-submit')" />
  <div v-else id="reply-open" class="card noselect" :class="{ disabled: !formDisabled }" @click="inputToggle">
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
    docId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    formDisabled() {
      return this.email ? '' : 'disabled';
    },

    validText() {
      return this.email ? `댓글 달기` : `댓글 달기는 로그인이 필요합니다`;
    },
  },

  methods: {
    inputToggle() {
      const { email, isOpen } = this;
      if (!email) return this.$router.push(`/user/login`);
      this.isOpen = !isOpen;
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

.disabled {
  cursor: not-allowed;
}

.reply-valid-text {
  font-style: oblique;
  font-size: 0.8rem;
}
</style>
