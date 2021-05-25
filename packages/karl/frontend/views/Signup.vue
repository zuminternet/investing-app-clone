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

  mounted() {},
};
</script>

<style scope lang="scss"></style>
