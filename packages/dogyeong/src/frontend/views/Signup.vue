<template>
  <div>
    <HeaderBar>회원가입</HeaderBar>
    <form>
      <label>name <input v-model="name" type="text"/></label>
      <label>email <input v-model="email" type="email"/></label>
      <label>password <input v-model="password" type="password"/></label>
      <button type="submit" @click.prevent="onClickSignupBtn">sign up</button>
    </form>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Axios from 'axios';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { apiEndpoints } from '@/config';

export default Vue.extend({
  components: {
    HeaderBar,
    BottomNav,
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },

  methods: {
    onClickSignupBtn() {
      Axios.post(apiEndpoints.signup, {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(() => this.$router.replace('/login'))
        .catch(console.error);
    },
  },
});
</script>

<style lang="scss" scoped></style>
