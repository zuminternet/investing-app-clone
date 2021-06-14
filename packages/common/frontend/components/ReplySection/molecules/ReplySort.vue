<template>
  <div class="reply-sort noselect">
    정렬: <Button class="reply-sort-button" @click.native="$emit('change-sort')">{{ sortText }}</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '@/components/atoms/Button.vue';

export default Vue.extend({
  name: 'ReplySort',

  components: { Button },

  props: {
    sortText: {
      type: String,
      default: '최신순',
    },
  },
});
</script>

<style lang="scss" scoped>
.reply-sort {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.7rem;
  color: rgba(97, 97, 97, 1);

  &-button {
    width: 50px;
    background-color: rgba(245, 245, 245, 1);
    border: 2px solid rgba(245, 245, 245, 1);
    margin-left: 2px;
    font-weight: bold;
  }
}
</style>
