<template>
  <div class="bottom-navigator">
    <naviagtor-button
      v-for="(navigatorButtonName, index) in navigatorButtonNames"
      isBottomNavigatorButton
      :key="index"
      @route-to-target-page="routeToTargetPage"
      :navigatorButtonName="navigatorButtonName"
    ></naviagtor-button>
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
  props: {
    navigatorButtonNames: {
      type: Array,
      required: true,
    },
  },

  methods: {
    routeToTargetPage(event) {
      const { MARKET, NEWS, BOOKMARK } = text;
      const targetPage = event.target.innerText;
      const { current } = this.$router.history;

      if (targetPage === MARKET) {
        this.$router.push('market');
      }

      if (targetPage === NEWS) {
        this.$router.push('news');
      }

      if (targetPage === BOOKMARK) {
        this.$router.push('bookmark');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bottom-navigator {
  display: flex;
  height: 50px;
}
</style>
