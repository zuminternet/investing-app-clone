<template>
  <div class="bottom-navigator">
    <naviagtor-button v-for="(navigatorButtonName, index) in navigatorButtonNames" :key="index" :buttonIndex="index">{{
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
    const { MARKET, NEWS, CALENDAR, FAVORITES, MORE } = text;
    return {
      market: MARKET,
      news: NEWS,
      calendar: CALENDAR,
      favorites: FAVORITES,
      more: MORE,
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
