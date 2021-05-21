<template>
  <div class="bottom-navigator">
    <naviagtor-button v-for="(navigatorButtonName, index) in navigatorButtonNames" :key="index">{{
      navigatorButtonName
    }}</naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from '../components/NaviagtorButton.vue';
import { text } from '../constants';

export default {
  name: 'BottomNaviagtor',
  components: {
    NaviagtorButton,
  },
  props: ['navigatorButtonNames'],

  data: function() {
    return {
      market: text.MARKET,
      news: text.NEWS,
      calendar: text.CALENDAR,
      favorites: text.FAVORITES,
      more: text.MORE,
    };
  },
};
</script>

<style scoped lang="scss">
.bottom-navigator {
  display: flex;
  height: 50px;
}
</style>
