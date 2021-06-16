<template>
  <div class="area">
    <!-- 상단 시세 요약 -->
    <div id="stocks-detail-header" class="card">
      <img v-show="logo" :src="logo" height="35px" />
      <Words id="stocks-detail-header-tickerName">{{ tickerName }}</Words>
      <Words id="stocks-detail-header-price" :class="colorClass">현재가 {{ price }}원 </Words>
      <Words id="stocks-detail-header-change" :class="colorClass"> ({{ changeSign }}{{ change }}%) </Words>
    </div>
    <PriceSummary v-bind="{ ...priceSummary }" />
    <Chart class="card" :typeName="`stock`" :apiType="`es`" :ticker="ticker" />

    <!-- 상세정보 표시 영역 -->
    <section>
      <Words> {{ weburl }} </Words>
      <Words> 상장일: {{ ipo }} </Words>
      <Words> 전화: {{ phone }} </Words>
      <Words> 최근 3년 EPS 성장률 {{ epsGrowth3Y }} </Words>
      <Words> 연간 BPS {{ pbAnnual }} </Words>
      <Words> 연간 ROI {{ roiAnnual }} </Words>
      <Words> 최근 연간 ROE {{ roeRfy }} </Words>
    </section>

    <ReplySection :ticker="ticker" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import Words from '@/components/atoms/Words.vue';
import Chart from '@/components/molecules/Chart.vue';
import PriceSummary from '@/components/organisms/StockDetailPriceSummary.vue';
import ReplySection from '@/components/organisms/ReplySection.vue';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  components: {
    Words,
    Chart,
    PriceSummary,
    ReplySection,
  },

  props: {
    /** router로 전달받음 */
    ticker: {
      type: String,
    },
  },

  data() {
    return {
      ipo: undefined,
      phone: undefined,
      weburl: undefined,
      logo: undefined,

      peer: [],
      epsGrowth3Y: undefined,
      pbAnnual: undefined,
      roeRfy: undefined,
      roiAnnual: undefined,

      priceSummary: {},
    };
  },

  computed: {
    ...mapState(['stockOverviews', 'stockData']),

    tickerName() {
      return this.stockData[this.ticker].tickerName;
    },

    price() {
      return this.stockData[this.ticker].price;
    },

    change() {
      return this.stockData[this.ticker].change;
    },

    changeSign() {
      return this.change > 0 ? '+' : '';
    },

    colorClass() {
      return this.change > 0 ? 'up' : this.change < 0 ? 'down' : 'same';
    },
  },

  mounted() {
    const {
      metric: { metric },
      peer,
      profile: { ipo, phone, weburl, marketCapitalization, logo },
    } = this.stockOverviews[this.ticker];

    const { epsGrowth3Y, pbAnnual, roeRfy, roiAnnual } = metric;

    this.ipo = ipo;
    this.phone = phone.split('.')[0];
    this.weburl = weburl;
    this.logo = logo;

    this.peer = peer;
    this.epsGrowth3Y = epsGrowth3Y.toFixed(2);
    this.pbAnnual = pbAnnual.toFixed(2);
    this.roeRfy = roeRfy.toFixed(2);
    this.roiAnnual = roiAnnual.toFixed(2);

    this.priceSummary = {
      marketCapitalization: marketCapitalization.toLocaleString(),
      week52High: metric['52WeekHigh'].toLocaleString(),
      week52Low: metric['52WeekLow'].toLocaleString(),
    };
  },
});
</script>

<style lang="scss" scoped>
main.area {
  display: grid;
  place-content: center;
}

#stocks-detail-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .pure-text {
    width: max-content;
  }

  &-tickerName {
    color: $grey-700;
    font-weight: 700;
  }

  &-price {
  }

  &-change {
    font-size: 0.7rem;
  }
}

.up {
  color: $red-700;
}

.down {
  color: $blue-700;
}

.same {
  color: inherit;
}
</style>
