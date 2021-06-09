<template>
  <Link :href="href" :name="name" class="user-link" />
</template>

<script lang="ts">
import Vue from 'vue';
import Link from '@/components/atoms/RouterLink.vue';

export default Vue.extend({
  components: { Link },

  props: {
    href: {
      type: String,
    },
    name: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.user-link {
  width: 150px;
  line-height: 1.2rem;
  background-color: $green-500;
  color: $green-100;

  &:hover {
    font-style: normal;
    font-weight: bolder;
    vertical-align: middle;
  }
}
</style>
