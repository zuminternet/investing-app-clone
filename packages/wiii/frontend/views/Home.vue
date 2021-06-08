<template>
  <div class="area">
    <Header :titleText="titleText" />
    <HomeTemplate />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/organisms/Header';
import HomeTemplate from '@/components/templates/Home';
import Footer from '@/components/organisms/Footer';
import { viewsTitle } from '@/type/views';

export default {
  name: 'HomeView',

  components: {
    Header,
    HomeTemplate,
    Footer,
  },

  data() {
    return {
      titleText: viewsTitle.Home,
    };
  },
};
</script>
