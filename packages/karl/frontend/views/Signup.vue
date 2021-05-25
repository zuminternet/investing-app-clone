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
  },

  mounted() {
    // createUser({ name: 'test1', email: 'test2', password: 'test3' });

    // if (loginUserByEmail({ email: 'test3', password: 'test2' })) {
    //   this.routeToHome();
    // }

    console.log(getUser());
  },
};
</script>

<style scope lang="scss"></style>
