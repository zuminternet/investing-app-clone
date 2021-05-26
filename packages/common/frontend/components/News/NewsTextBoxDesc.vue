<template>
  <p>
    <span class="news-author" :style="authorStyle">{{ author }}</span>
    <span class="news-date" :style="dateStyle">{{ publishDate }}</span>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 리스트 텍스트 박스의 부가정보 영역
 * @author dogyeong
 *
 * @property {String} author 왼쪽 작가/기자 영역의 텍스트 내용
 * @property {String} publishDate 오른쪽 시간 영역의 텍스트 내용
 * @property {Object, String} authorStyle author 부분에 적용될 스타일
 * @property {Object, String} dateStyle publishDate 부분에 적용될 스타일
 */

export default Vue.extend({
  name: 'NewsTextBoxDesc',

  props: {
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    authorStyle: {
      type: [Object, String],
      default: () => '',
    },
    dateStyle: {
      type: [Object, String],
      default: () => '',
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  color: gray;

  .news-author {
    margin-right: 12px;
  }
}
</style>
