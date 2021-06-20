<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th @click="$emit('clickValueTab')">현재가{{ sortByValue | formatSortText }}</th>
          <th @click="$emit('clickDiffTab')">전일대비{{ sortByDiff | formatSortText }}</th>
        </tr>
      </thead>
      <tbody>
        <RouterLink
          v-for="{ display_name, symbol, date, diff, growthRate, close, exchange } in listData"
          :key="symbol"
          :to="`/market/stock/${symbol}`"
        >
          <tr>
            <td>
              <h4>{{ display_name }}</h4>
              <span class="date">{{ date | formatDate }} | {{ exchange }}</span>
            </td>
            <td class="value">
              <span :data-symbol="symbol">{{ close }}</span>
            </td>
            <td>
              <span class="diff" :class="getColorClass(diff)">
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
import { sortMap } from '@/mixin/sortMixin';
import { formatDate, formatNumber, formatPercent } from '@/filters';

/**
 * 시장 탭에서 사용하는 리스트 컴포넌트
 * 지수, 주식, 가상화폐의 현재 시세를 보여준다
 *
 * @prop {MarketListItem[]} listData 아래의 MarketListItem 인터페이스 참고
 * @prop {number} sortByValue 현재가 정렬 기준 @see @/mixin/sortMixin#sortMap
 * @prop {number} sortByDiff 전일대비 정렬 기준 @see @/mixin/sortMixin#sortMap
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
    formatDate,
    formatNumber,
    formatPercent,
    formatSortText(sortBy: number) {
      if (sortBy === sortMap.desc) return '(내림)';
      if (sortBy === sortMap.asc) return '(오름)';
      return '';
    },
  },

  props: {
    listData: {
      type: Array,
      required: true,
    },
    sortByValue: {
      type: Number,
      default: sortMap.none,
    },
    sortByDiff: {
      type: Number,
      default: sortMap.none,
    },
  },

  watch: {
    listData(newList, oldList) {
      newList.forEach(function compareNewValue(newVal, idx) {
        const oldVal = oldList[idx];
        const $el = document.querySelector(`[data-symbol="${newVal.symbol}"]`);

        if (!$el) return;

        const diff = newVal.diff - oldVal.diff;

        $el.className = ''; // 강제 리플로우?

        if (diff < 0) {
          $el.classList.add('blue-effect');
        }
        if (diff > 0) {
          $el.classList.add('red-effect');
        }
      });
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
    padding: 20px 12px;
    font-weight: 400;
  }

  td {
    padding: 8px 12px;

    h4 {
      margin-bottom: 4px;
    }

    .date {
      color: var(--sub-text-color);
      font-size: 15px;
    }
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

  .value {
    color: var(--text-color);
    font-size: 18px;
  }

  .diff {
    &.red {
      color: var(--red-color);
    }
    &.blue {
      color: var(--blue-color);
    }
  }
}

.red-effect {
  animation-name: redBgEffect;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
}

.blue-effect {
  animation-name: blueBgEffect;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
}

@keyframes redBgEffect {
  0% {
    background: transparent;
  }
  50% {
    background: var(--red-color);
  }
  100% {
    background: transparent;
  }
}

@keyframes blueBgEffect {
  0% {
    background: transparent;
  }
  50% {
    background: var(--blue-color);
  }
  100% {
    background: transparent;
  }
}
</style>
