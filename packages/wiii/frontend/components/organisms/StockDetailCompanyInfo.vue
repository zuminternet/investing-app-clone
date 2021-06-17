<template>
  <div id="stock-detail-company-info">
    <Words class="stock-detail-company-subtitle">기업개요</Words>
    <section class="stock-detail-company">
      <Words class="stock-detail-company-text head"> 홈페이지 </Words>
      <Words class="stock-detail-company-text link" @click.native="openUrl"> {{ weburl }} </Words>
      <Words class="stock-detail-company-text head"> 대표전화 </Words>
      <Words class="stock-detail-company-text"> {{ phone }} </Words>
      <Words class="stock-detail-company-text head"> 상장일 </Words>
      <Words class="stock-detail-company-text"> {{ ipo }} </Words>
      <Words class="stock-detail-company-text head"> 거래소 </Words>
      <Words class="stock-detail-company-text"> {{ exchangeKR }} </Words>
    </section>

    <Words class="stock-detail-company-subtitle">투자지표</Words>
    <section class="stock-detail-company">
      <Words class="stock-detail-company-text head"> 최근 결산 연도 EPS </Words>
      <Words class="stock-detail-company-text"> {{ `${eps.v.toFixed(2)} (${eps.period})` }} </Words>
      <Words class="stock-detail-company-text head"> 최근 3년 평균 EPS 성장률 </Words>
      <Words class="stock-detail-company-text"> {{ epsGrowth3Y }} </Words>
      <Words class="stock-detail-company-text head"> PBR </Words>
      <Words class="stock-detail-company-text"> {{ pbAnnual }} </Words>
      <Words class="stock-detail-company-text head"> ROE </Words>
      <Words class="stock-detail-company-text"> {{ roeRfy }} </Words>
      <Words class="stock-detail-company-text head"> 1주당 배당금 </Words>
      <Words class="stock-detail-company-text"> {{ dps }}원 </Words>
      <Words class="stock-detail-company-text head"> 배당수익률 </Words>
      <Words class="stock-detail-company-text"> {{ dpsRate }}% </Words>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';

export default Vue.extend({
  name: 'StockDetailCompanyInfo',

  components: { Words },

  props: {
    weburl: {
      type: String,
    },
    ipo: {
      type: String,
    },
    exchange: {
      type: String,
    },
    phone: {
      type: String,
    },
    eps: {
      type: Object,
      default: () => {
        v: 0;
        period: '';
      },
    },
    epsGrowth3Y: {
      type: String,
    },
    pbAnnual: {
      type: String,
    },
    roiAnnual: {
      type: String,
    },
    roeRfy: {
      type: String,
    },
    peer: {
      type: Array,
      default: () => [],
    },
    dps: {
      type: String,
    },
    dpsRate: {
      type: String,
    },
  },

  computed: {
    exchangeKR() {
      return this.exchange.includes('KOREA EXCHANGE') ? '한국거래소' : '';
    },
  },

  methods: {
    openUrl() {
      window.open(this.weburl);
    },
  },
});
</script>

<style lang="scss" scoped>
$dark-green: $neon-green;

.stock-detail-company-info {
  width: 100%;
}

.stock-detail-company {
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 3fr;
  grid-auto-rows: minmax(1.2rem, auto);
  justify-content: center;

  &-subtitle {
    margin-top: 5px;
    padding: 5px;
    width: max-content;

    font-size: 1.1rem;
    font-weight: bold;
    text-align: left;
    color: $grey-700;

    .dark & {
      color: $dark-green;
    }
  }

  &-text {
    font-size: 0.9rem;
    color: $grey-900;
    text-align: left;

    &.head {
      font-weight: bolder;
    }

    &.link {
      cursor: pointer;
      font-style: oblique;
      text-decoration: underline;
    }

    .dark & {
      color: rgba($dark-green, 0.6);
    }
  }
}
</style>
