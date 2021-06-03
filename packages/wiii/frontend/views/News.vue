<template>
  <div class="area">
    <header class="area">
      <Title />
      <Menu />
    </header>
    <main class="area">
      <News />
      <Reply />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/molecules/HeaderMenus';
import Title from '@/components/molecules/NewsTitle';
import News from '@/components/organisms/NewsSection';
import Reply from '@/components/organisms/ReplySection';
import Footer from '@/components/organisms/Footer';

export default Vue.extend({
  name: 'NewsView',
  components: {
    Menu,
    Title,
    News,
    Reply,
    Footer,
  },
});
</script>
