<template>
  <div>
    <HeaderBar>
      더보기
    </HeaderBar>
    <div class="setting-item"><input v-model="$store.state.isDarkTheme" type="checkbox" /> 어두운 테마</div>
    <div class="setting-item"><RouterLink to="/login">로그인</RouterLink></div>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'Setting',
  components: { BottomNav, HeaderBar },
  data() {
    return { isDark: false };
  },
  methods: {
    onClickThemeToggleInput() {
      console.log(this.isDark);
    },
  },
});
</script>

<style lang="scss" scoped>
.setting-item {
  padding: 12px;
}
</style>
