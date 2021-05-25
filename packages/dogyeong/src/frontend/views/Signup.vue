<template>
  <div>
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
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import * as authService from '@/services/authService';

export default Vue.extend({
  components: {
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
      authService
        .signup({
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
