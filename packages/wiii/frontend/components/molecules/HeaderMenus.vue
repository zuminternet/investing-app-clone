<template>
  <div class="rows-space-between">
    <Link v-for="{ id, name, href } in HomeMenuData" :key="id" :name="name" :href="href" :isDark="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Link from '@/components/atoms/RouterLink';
import { HomeMenuData } from '@/type/views';

export default Vue.extend({
  name: 'HeaderMenus',

  data() {
    return {
      HomeMenuData,
    };
  },

  components: {
    Link,
  },
});
</script>
