<template>
  <li class="news-list-item">
    <article>
      <RouterLink class="news-link" :to="to" :style="listStyle">
        <slot></slot>
      </RouterLink>
    </article>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 리스트의 개별 row 컴포넌트
 * @author dogyeong
 *
 * @property {String} to 클릭하면 이동할 url
 * @property {Object, String} listStyle 커스터마이징을 위해 전달할 수 있는 스타일 객체
 */

export default Vue.extend({
  name: 'NewsListItem',

  props: {
    to: {
      type: String,
      required: true,
    },
    listStyle: {
      type: [Object, String],
      default: () => '',
    },
  },
});
</script>

<style lang="scss">
.news-list-item {
  .news-link {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid gray;
  }

  .news-img-container {
    margin-right: 12px;
    width: 40%;
    padding-top: 20%;
  }
}
</style>
