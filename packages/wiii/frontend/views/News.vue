<template>
  <div class="area">
    <Header :titleText="titleText" />
    <main class="area">
      <News />
      <Reply />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/organisms/Header';
import News from '@/components/organisms/NewsSection';
import Reply from '@/components/organisms/ReplySection';
import Footer from '@/components/organisms/Footer';
import { viewsTitle } from '@/type/views';

export default Vue.extend({
  name: 'NewsView',

  components: {
    Header,
    News,
    Reply,
    Footer,
  },

  data() {
    return {
      titleText: viewsTitle.News,
    };
  },
});
</script>
