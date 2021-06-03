<template>
  <footer>
    <Words class="card noselect" :contents="'Footer'" />
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

import Words from '@/components/atoms/Words';

export default Vue.extend({
  components: { Words },
});
</script>
