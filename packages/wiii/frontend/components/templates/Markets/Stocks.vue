<template>
  <main class="area">
    <Chart class="card" :typeName="`stock`" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import Chart from '@/components/organisms/Chart';
import ReplySection from '@/components/organisms/ReplySection'

export default Vue.extend({
  components: {
    Chart,
    ReplySection,
  },
});
</script>
