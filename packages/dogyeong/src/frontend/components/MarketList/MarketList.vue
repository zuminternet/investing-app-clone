<template>
  <ul>
    <li v-for="{ key, date, diff, growthRate, value } in listData" :key="key" :style="itemStyle">
      <RouterLink :to="`/market/stock/${key}`">
        <div>
          <h4 :style="titleStyle">{{ key }}</h4>
          <span :style="dateStyle">{{ date }}</span>
        </div>
        <div>
          <span class="value" :style="valueStyle">{{ value }}</span>
          <span class="diff" :class="getColorClass(diff)" :style="diffStyle">
            {{ diff | formatNumber }}
            {{ growthRate | formatNumber | formatPercent }}
          </span>
        </div>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * 시장 탭에서 사용하는 리스트 컴포넌트
 * 지수, 주식, 가상화폐의 현재 시세를 보여준다
 *
 * @property {MarketListItem[]} listDate 아래의 MarketListItem 인터페이스 참고
 * @property {object} itemStyle 하나의 row에 해당하는 li태그 스타일
 * @property {object} titleStyle 종목 이름 스타일
 * @property {object} dateStyle 종목 이름 아래의 날짜 부분 스타일
 * @property {object} valueStyle 현재 값 부분 스타일
 * @property {object} diffStyle 값 아래의 변동값 스타일
 */

export interface MarketListItem {
  key: string;
  value: number;
  diff: number;
  growthRate: number;
}

export default Vue.extend({
  name: 'MarketList',

  filters: {
    formatNumber(value: number) {
      const sign = value > 0 ? '+' : '';
      const fixedValue = value.toFixed(2);
      return `${sign}${fixedValue}`;
    },
    formatPercent(value: number) {
      return `(${value}%)`;
    },
  },

  props: {
    listData: {
      type: Array,
      required: true,
    },
    itemStyle: {
      type: Object,
      default: () => ({}),
    },
    titleStyle: {
      type: Object,
      default: () => ({}),
    },
    dateStyle: {
      type: Object,
      default: () => ({}),
    },
    valueStyle: {
      type: Object,
      default: () => ({}),
    },
    diffStyle: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    getColorClass(value: number) {
      if (value > 0) return 'red';
      if (value < 0) return 'blue';
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
ul {
  li {
    a {
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
    }

    h4 {
      font-size: 1.2rem;
    }

    .value,
    .diff {
      display: block;
      text-align: right;
    }

    .value {
      font-size: 1.2rem;
    }

    .diff {
      font-size: 1rem;
      font-weight: bold;

      &.red {
        color: var(--red-color);
      }
      &.blue {
        color: var(--blue-color);
      }
    }
  }
}
</style>
