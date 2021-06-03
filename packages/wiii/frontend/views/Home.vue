<template>
  <div class="area">
    <Header />
    <HomeTemplate />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/organisms/HomeHeader';
import HomeTemplate from '@/components/templates/Home';
import Footer from '@/components/organisms/Footer';

export default {
  name: 'Home',
  components: {
    Header,
    HomeTemplate,
    Footer,
  },
};
</script>
