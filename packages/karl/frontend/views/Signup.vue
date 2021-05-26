<template>
  <div>
    Signup
  </div>
</template>

<script lang="ts">
import { createUser, loginUserByEmail, getUser } from '../apis';

export default {
  name: 'Signup',

  methods: {
    routeToHome() {
      this.$router.push('/home');
    },

    test() {},
  },

  mounted() {
    createUser({ name: 'karl6', email: 'karl5', password: 'karl6' });
  },
};
</script>

<style scope lang="scss"></style>
