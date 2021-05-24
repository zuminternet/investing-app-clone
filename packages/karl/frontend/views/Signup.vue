<template>
  <div>
    Signup
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { createUser } from '../apis';

export default {
  name: 'Signup',

  mounted() {
    createUser('test1', 'test2', 'test3');
  },
};
</script>

<style scope lang="scss"></style>
