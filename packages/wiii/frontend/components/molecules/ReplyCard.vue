<template>
  <article class="card reply">
    <Words :contents="`[ ${replId} ] ${title}  - ${user}`" />
    <Words :contents="contents" />
    <Words :contents="date" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words';

export default Vue.extend({
  name: 'ReplyCard',

  components: { Words },

  props: {
    /** replId, title, contents, date, user */
    replId: {
      type: [String, Number],
    },
    title: {
      type: [String, Number],
    },
    contents: {
      type: [String, Number],
    },
    date: {
      type: [String, Date],
    },
    user: {
      type: [String, Number],
    },
  },
});
</script>

<style lang="scss" scoped>
.reply {
}
</style>