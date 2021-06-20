<template>
  <span
    :class="{
      'default-text': true,
      'button-active': buttonActive,
      'app-title': appTitle,
      'page-title': pageTitle,
      'item-card-name-price': itemCardNameAndPrice,
      'item-card-plus': itemCardPlus,
      'item-card-minus': itemCardMinus,
      'item-card-time-category': itemCardTimeAndCategory,
      'item-detail-price': itemDetailPrice,
      'item-detail-plus': itemDetailPlus,
      'item-detail-minus': itemDetailMinus,
      'item-detail-normal': itemDetailNormal,
      'overview-row-name': overviewRowName,
      'overview-row-value': overviewRowValue,
      'sub-content-title': subContentTitle,
      'chart-menu-active-text': chartMenuActiveText,
      'o-auth-text': OAuthText,
      'login-button-text': loginButtonText,
    }"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    buttonActive: {
      type: Boolean,
      default: false,
    },

    appTitle: {
      type: Boolean,
      default: false,
    },

    pageTitle: {
      type: Boolean,
      default: false,
    },

    itemCardNameAndPrice: {
      type: Boolean,
      default: false,
    },

    itemCardPlus: {
      type: Boolean,
      default: false,
    },

    itemCardMinus: {
      type: Boolean,
      default: false,
    },

    itemCardTimeAndCategory: {
      type: Boolean,
      default: false,
    },

    itemDetailPrice: {
      type: Boolean,
      default: false,
    },

    itemDetailPlus: {
      type: Boolean,
      default: false,
    },

    itemDetailMinus: {
      type: Boolean,
      default: false,
    },

    itemDetailNormal: {
      type: Boolean,
      default: false,
    },

    overviewRowName: {
      type: Boolean,
      default: false,
    },

    overviewRowValue: {
      type: Boolean,
      default: false,
    },

    subContentTitle: {
      type: Boolean,
      default: false,
    },

    chartMenuActiveText: {
      type: Boolean,
      default: false,
    },

    OAuthText: {
      type: Boolean,
      default: false,
    },

    loginButtonText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.default-text {
  color: var(--text-color);
}

.login-button-text {
  font-weight: bold;
  color: var(--blue-color);
}

.page-title {
  font-weight: bold;
}

.button-active {
  color: var(--active-button-color);
  font-weight: bold;
}

.app-title {
  color: var(--title-color);
  font-weight: bold;
  margin-left: 10px;
}

.item-card-name-price {
  font-weight: bold;
}

.item-card-time-category {
  color: var(--gray-color);
}

.item-card-plus {
  font-weight: bold;
  color: var(--red-color);
}

.item-card-minus {
  font-weight: bold;
  color: var(--blue-color);
}

.item-detail-price {
  font-weight: bold;
  font-size: 25px;
}

.item-detail-plus {
  font-weight: bold;
  color: var(--red-color);
  font-size: 20px;
}

.item-detail-minus {
  font-weight: bold;
  color: var(--blue-color);
  font-size: 20px;
}

.item-detail-normal {
  font-weight: bold;
}

.overview-row-name {
  font-weight: bold;
  font-size: 16px;
}

.overview-row-value {
  font-weight: bold;
}

.sub-content-title {
  font-weight: bold;
  margin-left: 5px;
}

.chart-menu-active-text {
  color: var(--blue-color);
  font-weight: bold;
}

.o-auth-text {
  color: white;
  font-weight: bold;
}
</style>
