<template>
  <div class="top-navigator">
    <naviagtor-button class="top-navigator-button" :buttonName="latest"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="hottestNews"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="cryptoCurrency"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="foreignExchangeMarket"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="stockMarket"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="economicIndicator"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="economicNews"></naviagtor-button>
    <naviagtor-button class="top-navigator-button" :buttonName="covid19"></naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from '../components/NaviagtorButton.vue';
import { text } from '../../../common/frontend/constants';

export default {
  name: 'TopNaviagtor',
  components: {
    NaviagtorButton,
  },

  data: function() {
    return {
      latest: text.LATEST,
      hottestNews: text.HOTTEST_NEWS,
      cryptoCurrency: text.CRYPTO_CURRENCY,
      foreignExchangeMarket: text.FOREIGN_EXCHANGE_MARKET,
      stockMarket: text.STOCK_MARKET,
      economicIndicator: text.ECONOMIC_INDICATOR,
      economicNews: text.ECONOMIC_NEWS,
      covid19: text.COVID_19,
    };
  },
};
</script>
<style scoped lang="scss">
.top-navigator {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 50px;
}

.top-navigator-button {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}
</style>
