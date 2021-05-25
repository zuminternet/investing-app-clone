<template>
  <div class="login-wrapper">
    <div class="form-wrapper">
      <form>
        <input v-model="email" type="email" />
        <input v-model="password" type="password" />
        <button type="submit" @click.prevent="login({ email, password })">login</button>
      </form>
      <RouterLink to="/">to home</RouterLink><br />
      <button @click="googleLogin">Google</button>
      <RouterLink to="/signup">sign up</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Login',

  components: {},

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['login', 'googleLogin']),
  },
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .form-wrapper {
    position: relative;
    text-align: center;
    top: 30%;
  }
}
</style>
