<template>
  <form class="email-login-input-form" @submit.prevent="$emit('handle-submit', { $data })">
    <template v-if="this.isRegister">
      <input class="email-login-input" :placeholder="nameText" v-model="name" />
    </template>
    <input class="email-login-input" :placeholder="emailText" v-model="email" />
    <input class="email-login-input" type="password" :placeholder="passwordText" v-model="password" />
    <input class="email-login-submit" type="submit" :value="this.submitButtonText" />
  </form>
</template>

<script>
import { text } from '../../../common/frontend/constants';

export default {
  name: 'LoginPasswordInputForm',
  props: {
    submitButtonText: {
      type: String,
      required: true,
    },
    isRegister: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    const { EMAIL, PASSWORD, EMAIL_LOGIN, NAME } = text;

    return {
      name: '',
      email: '',
      password: '',

      nameText: NAME,
      emailText: EMAIL,
      passwordText: PASSWORD,
      emailLogin: EMAIL_LOGIN,
    };
  },

  methods: {
    routeToHome() {
      this.$router.push('home');
    },

    routeToSignup() {
      this.$router.push('signup');
    },
  },
};
</script>

<style scoped lang="scss">
.email-login-input-form {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}

.email-login-input {
  margin-top: 15px;
  border-radius: 20px;
  border: 0;
  padding: 10px;
}

.email-login-submit {
  margin-top: 15px;
  color: var(--blue-color);
  font-weight: bold;
  border: 0;
}
</style>
