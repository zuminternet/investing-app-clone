<template>
  <main class="area">
    <Words> {{ newsid }} </Words>
    <Reply />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Reply from '@/components/organisms/ReplySection.vue';

export default Vue.extend({
  name: 'NewsDetail',

  components: { Words, Reply },

  props: {
    newsid: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>