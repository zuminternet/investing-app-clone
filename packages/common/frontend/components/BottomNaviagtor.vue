<template>
  <div class="bottom-navigator">
    <naviagtor-button>{{ market }}</naviagtor-button>
    <naviagtor-button>{{ news }}</naviagtor-button>
    <naviagtor-button>{{ calendar }}</naviagtor-button>
    <naviagtor-button>{{ favorites }}</naviagtor-button>
    <naviagtor-button>{{ more }}</naviagtor-button>
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
