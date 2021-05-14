<template>
  <div>
    <header>
      <top-naviagtor></top-naviagtor>
    </header>
    <main>
      <div></div>
    </main>
    <footer>
      <bottom-naviagtor></bottom-naviagtor>
    </footer>
  </div>
</template>

<script>

import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'

export default {
  name: 'Home',
  components: {
    BottomNaviagtor,
    TopNaviagtor
  }
};
</script>

<style></style>
