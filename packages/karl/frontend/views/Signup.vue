<template>
  <div>
    Signup
  </div>
</template>

<script lang="ts">
import { createUser, loginUserByEmail } from '../apis';

export default {
  name: 'Signup',

  mounted() {
    // createUser({ name: 'test1', email: 'test2', password: 'test3' });
    loginUserByEmail({ email: 'test3', password: 'test2' });
  },
};
</script>

<style scope lang="scss"></style>
