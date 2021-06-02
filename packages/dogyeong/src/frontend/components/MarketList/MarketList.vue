<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>현재가</th>
          <th>전일대비</th>
        </tr>
      </thead>
      <tbody>
        <RouterLink
          :to="`/market/stock/${key}`"
          v-for="{ key, date, diff, growthRate, value } in listData"
          :key="key"
          :style="itemStyle"
        >
          <tr>
            <td>
              <h4 :style="titleStyle">{{ key }}</h4>
              <span :style="dateStyle">{{ date }}</span>
            </td>
            <td>
              <span class="value" :class="getColorClass(diff)" :style="valueStyle">{{ value }}</span>
            </td>
            <td>
              <span class="diff" :class="getColorClass(diff)" :style="diffStyle">
                {{ diff | formatNumber }}
                {{ growthRate | formatNumber | formatPercent }}
              </span>
            </td>
          </tr>
        </RouterLink>
      </tbody>
    </table>
  </div>
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
table {
  width: 100%;
  height: 100%;
  font-size: 1rem;

  a {
    padding: 8px 12px;
    display: contents;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    padding: 12px;
  }

  td {
    padding: 6px 12px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th,
  td {
    vertical-align: middle;
    text-align: right;
    border-bottom: 1px solid var(--border-color);
  }

  .value,
  .diff {
    &.red {
      color: var(--red-color);
    }
    &.blue {
      color: var(--blue-color);
    }
  }
}
</style>
