<template>
  <ul>
    <Icon v-for="{ id, name, href } in icons" :key="id" :name="name" :href="href" />
  </ul>
</template>

<script>
import { mapMutations } from 'vuex';
import Icon from './MenuIcon';
import { actionTypes } from '@/store/types';
import { viewEnums } from '@/type';
const { views, paths } = viewEnums;

export default {
  data() {
    return {
      icons: [
        { id: views.Home, name: '홈', href: paths.Home },
        { id: views.Markets, name: '마켓', href: paths.IndexMarket },
        { id: views.News, name: '뉴스', href: paths.News },
      ],
    };
  },
  components: {
    Icon,
  },
  methods: {
    ...mapMutations([actionTypes.setCurrentView]),
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
