<template>
  <div class="area">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/organisms/HomeHeader';
import Main from '@/components/main/';
import Footer from '@/components/footer/';

export default {
  name: 'Home',
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>
