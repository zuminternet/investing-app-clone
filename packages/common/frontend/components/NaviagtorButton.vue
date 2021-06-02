<template>
  <button
    v-if="isSwiperNavigatorButton && buttonIndex !== slideActiveIndex"
    class="navigator-button"
    @click="$emit('set-slide-active-index', buttonIndex)"
  >
    {{ navigatorButtonName }}
  </button>
  <button
    v-else-if="(isSwiperNavigatorButton && buttonIndex === slideActiveIndex) || (isBottomNavigatorButton && isActivePage)"
    class="navigator-button-active"
  >
    {{ navigatorButtonName }}
  </button>
  <button v-else-if="isBottomNavigatorButton" class="navigator-button" @click="$emit('route-to-target-page', $event)">
    {{ navigatorButtonName }}
  </button>
</template>

<script>
import { text } from '../constants';

export default {
  name: 'NaviagtorButton',
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
}

.navigator-button-active {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-color: green;
}
</style>
