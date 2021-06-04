<template>
  <Layout>
    <header></header>
    <main>
      <form>
        <input v-model="name" type="text" placeholder="name" />
        <input v-model="email" type="email" placeholder="email" />
        <input v-model="password" type="password" placeholder="password" />
        <button type="submit" @click.prevent="onClickSignupBtn">sign up</button>
      </form>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import * as authService from '@/services/authService';
import Layout from '@/components/Layout/Layout.vue';

export default Vue.extend({
  name: 'Signup',

  components: {
    BottomNav,
    Layout,
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

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  max-width: 350px;
  margin: auto;

  input {
    margin-bottom: 12px;
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }

  button {
    display: block;
    padding: 8px;
    background-color: var(--primary-color);
    font-size: 1rem;
    border-radius: 4px;
    color: var(--login-text-color);
  }
}
</style>
