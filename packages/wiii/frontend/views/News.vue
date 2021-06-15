<template>
  <div class="area">
    <Header :titleText="titleText" />
    <main class="area">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
import { viewsTitle } from '@/type/views';

export default Vue.extend({
  name: 'NewsView',

  data() {
    return {
      titleText: viewsTitle.News,
    };
  },

  components: {
    Header,
    Footer,
  },
});
</script>
