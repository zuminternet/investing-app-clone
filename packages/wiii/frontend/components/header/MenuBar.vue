<template>
  <ul>
    <Icon v-for="{ id, name, href } in icons" :key="id" :name="name" :href="href" />
  </ul>
</template>

<script>
import { mapMutations } from 'vuex';
import Icon from './MenuIcon';
import { mutationTypes } from '@/store/types';

export default {
  data() {
    return {
      icons: [
        { id: 'idx', name: '지수', href: '/indexes' },
        { id: 'stock', name: '주식', href: '/stocks' },
        { id: 'coin', name: '코인', href: '/coins' },
      ],
    };
  },
  components: {
    Icon,
  },
  methods: {
    ...mapMutations([mutationTypes.setCurrentView]),
  },
};
</script>

<style lang="scss" scoped>
ul {
  @extend .area;

  display: flex;
  flex-direction: columns;
  justify-content: space-around;

  li {
    list-style: none;
  }
}
</style>
