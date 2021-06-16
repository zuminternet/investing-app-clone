<template>
  <article v-if="to" class="news-headline">
    <RouterLink :to="to" :style="headlineStyle">
      <slot></slot>
    </RouterLink>
  </article>
  <article v-else class="news-headline" @click="$emit('handle-click', id)">
    <slot></slot>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * @description 뉴스 탭에서 가장 위에 위치하는 컴포넌트를 위한 컨테이너
 * @author dogyeong
 */

export default Vue.extend({
  name: 'NewsHeadline',

  props: {
    to: {
      type: String,
      default: '',
    },
    headlineStyle: {
      type: [Object, String],
      default: () => '',
    },

    id: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss">
.news-headline {
  a {
    border-bottom: 1px solid gray;
    background-color: white;
    display: block;

    .news-img-container {
      width: 100%;
    }
    .news-text-container {
      padding: 12px;
    }
  }
}
</style>
