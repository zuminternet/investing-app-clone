<template>
  <div id="home-page">
    <multipurpose-header></multipurpose-header>
    <top-naviagtor></top-naviagtor>
    <div class="contents-box"></div>
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>

import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue';

export default {
  name: 'Home',
  components: {
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader
  }
};
</script>

<style>
  #home-page {
    display:flex;
    flex-direction: column;
    flex:1;
  }

  .contents-box {
    flex:1
  }

</style>
