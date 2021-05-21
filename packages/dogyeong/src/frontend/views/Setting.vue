<template>
  <div>
    <HeaderBar>
      더보기
    </HeaderBar>
    {{ user }}
    <div class="setting-item"><input v-model="isDark" type="checkbox" /> 어두운 테마</div>
    <div v-if="!user" class="setting-item"><RouterLink to="/login">로그인</RouterLink></div>
    <div v-else @click="logout">로그아웃</div>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapActions } from 'vuex';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'Setting',

  components: { BottomNav, HeaderBar },

  computed: {
    isDark: {
      get() {
        return this.$store.state.isDarkTheme;
      },
      set(isDark) {
        this.changeTheme(isDark);
      },
    },
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    ...mapMutations(['changeTheme']),
    ...mapActions(['logout']),
  },
});
</script>

<style lang="scss" scoped>
.setting-item {
  padding: 12px;
}
</style>
