<template>
  <div class="bottom-navigator">
    <naviagtor-button v-for="(navigatorButtonName, index) in navigatorButtonNames" :key="index" :buttonIndex="index">{{
      navigatorButtonName
    }}</naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from '../components/NaviagtorButton.vue';

export default {
  name: 'BottomNaviagtor',
  components: {
    NaviagtorButton,
  },
  props: {
    type: Array,
    required: true,
  },
};
</script>

<style scoped lang="scss">
.bottom-navigator {
  display: flex;
  height: 50px;
}
</style>
