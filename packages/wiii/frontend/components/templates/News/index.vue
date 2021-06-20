<template>
  <List :class="{ loading }" v-bind="{ newsList, category }" />
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import List from '@/components/organisms/News.List.vue';
import { StoreNames } from '@/store';
import { marketEnum } from '../../../../domain/newsData';

const { mapState, mapActions } = createNamespacedHelpers(StoreNames.News);

export default Vue.extend({
  name: 'NewsIndex',

  components: { List },

  props: {
    category: {
      type: String,
      default: marketEnum.general,
    },
  },

  data() {
    return {
      loading: true,
      newsList: [],
    };
  },

  computed: {
    ...mapState(['cachedMarketNews']),
  },

  methods: {
    ...mapActions(['getMarketNewsAction']),
  },

  async beforeMount() {
    this.newsList = await this.getMarketNewsAction(this.category as marketEnum);
    this.loading = this.newsList.length === 0;
  },
});
</script>
