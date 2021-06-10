<template>
  <button class="navigator-button" @click="$emit('set-slide-active-index', buttonIndex)">
    <custom-text :buttonActive="isSwiperNavigatorButton && buttonIndex === slideActiveIndex">
      {{ navigatorButtonName }}
    </custom-text>
  </button>
</template>

<script>
import { text } from '../constants';
import CustomText from './CustomText.vue';

export default {
  name: 'NaviagtorButton',
  components: {
    CustomText,
  },

  props: {
    buttonIndex: {
      type: Number,
      default: 0,
    },
    slideActiveIndex: {
      type: Number,
      default: 0,
    },
    navigatorButtonName: {
      type: String,
      default: '',
    },
    isSwiperNavigatorButton: {
      type: Boolean,
      default: false,
    },
    isBottomNavigatorButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActivePage: false,
    };
  },

  mounted() {
    // 이건 필히 refactoring할 것
    const { MARKET, NEWS, BOOKMARK, MORE } = text;
    const { name } = this.$router.history.current;

    if ((name === 'Market' || name === 'ItemDetail') && this.navigatorButtonName === MARKET) {
      this.isActivePage = true;
    }

    if (name === 'News' && this.navigatorButtonName === NEWS) {
      this.isActivePage = true;
    }

    if (name === 'Bookmark' && this.navigatorButtonName === BOOKMARK) {
      this.isActivePage = true;
    }

    if (name === 'More' && this.navigatorButtonName === MORE) {
      this.isActivePage = true;
    }
  },
};
</script>

<style scoped lang="scss">
.navigator-button {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: var(--app-bg-color);
}
</style>
