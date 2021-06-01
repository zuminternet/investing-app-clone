<template>
  <Layout>
    <Header>
      <HeaderTitle>디테일</HeaderTitle>
    </Header>
    <main></main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
  },
});
</script>

<style lang="scss" scoped></style>
