<template>
  <header class="area">
    <Title />
    <MenuBar />
  </header>
</template>

<script>
import Title from './Title';
import MenuBar from './MenuBar';

export default {
  name: 'header',
  components: {
    Title,
    MenuBar,
  },
};
</script>
