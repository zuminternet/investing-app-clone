<template>
  <div class="area">
    <header class="area">
      <Menu />
      <Title />
    </header>
    <main class="area">
      <Reply />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from '@/components/molecules/HeaderMenus';
import Title from '@/components/molecules/NewsTitle';
import Reply from '@/components/organisms/ReplySection';

export default Vue.extend({
  name: 'NewsView',
  components: {
    Menu,
    Title,
    Reply,
  },
});
</script>
