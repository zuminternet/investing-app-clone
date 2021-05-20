<template>
  <div class="bottom-navigator">
    <naviagtor-button class="bottom-navigator-button" :buttonName="market"></naviagtor-button>
    <naviagtor-button class="bottom-navigator-button" :buttonName="news"></naviagtor-button>
    <naviagtor-button class="bottom-navigator-button" :buttonName="calendar"></naviagtor-button>
    <naviagtor-button class="bottom-navigator-button" :buttonName="favorites"></naviagtor-button>
    <naviagtor-button class="bottom-navigator-button" :buttonName="more"></naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from '../components/NaviagtorButton.vue'
import { text } from '../constants'

export default {
  name: "BottomNaviagtor",
  components: {
    NaviagtorButton,
  },

  data: function () {
    return {
      market : text.MARKET,
      news: text.NEWS,
      calendar: text.CALENDAR,
      favorites: text.FAVORITES,
      more: text.MORE
    }
  }
}
</script>

<style scoped lang="scss">
  .bottom-navigator {
    display: flex;
    height: 50px;
  }

  .bottom-navigator-button {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

</style>