<template>
  <div class="news-img-container" :style="roundedStyle">
    <img :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 리스트 내의 이미지 컴포넌트
 * @author dogyeong
 *
 * @property {String} src img 태그의 src속성
 * @property {String} alt img 태그의 alt속성
 * @property {Boolean} rounded 이미지의 테두리를 둥글게 설정
 */

export default Vue.extend({
  name: 'NewsImage',

  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: () => '',
    },
    rounded: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    roundedStyle() {
      if (!this.rounded) return {};

      return {
        borderRadius: '100%',
        width: '20%',
        paddingTop: '20%',
      };
    },
  },
});
</script>

<style lang="scss" scoped>
div {
  position: relative;
  height: 0;
  width: 100%;
  padding-top: 50%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}
</style>
