// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';

// .vue 확장자 파일 타입 선언
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// vue 컴포넌트 내의 $style 프로퍼티 타입 추가
// https://github.com/vuejs/vetur/issues/2407
declare module 'vue/types/vue' {
  interface Vue {
    $style: Record<string, string>;
  }
}
