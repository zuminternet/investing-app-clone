<template>
  <div>
    <HeaderBar>
      더보기
    </HeaderBar>
    <div class="setting-item"><input v-model="$store.state.isDarkTheme" type="checkbox" /> 어두운 테마</div>
    <div class="setting-item"><router-link to="/login">로그인</router-link></div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import BottomNav from '@/components/BottomNav/BottomNav';

export default {
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
};
</script>

<style lang="scss" scoped>
.setting-item {
  padding: 12px;
}
</style>
