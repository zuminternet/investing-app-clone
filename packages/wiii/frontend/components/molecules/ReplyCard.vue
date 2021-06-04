<template>
  <article class="card reply">
    <Words class="mini"> {{ `[ ${replId} ]` }} </Words>
    <Words> {{ contents }} </Words>
    <Words class="mini"> {{ user }} / {{ date }} </Words>
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
  display: flex;
  flex-direction: column;
  align-items: center;

  .pure-text {
    color: $grey-300;
  }

  .mini {
    align-self: flex-start;
    color: $neon-crimson;
  }
}
</style>
