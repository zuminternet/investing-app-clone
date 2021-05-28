<template>
  <form class="input-form" @submit.prevent="$emit('handle-submit', { $data })">
    <template v-if="this.isRegister">
      <input class="input" :placeholder="nameText" v-model="name" />
    </template>
    <input class="input" :placeholder="emailText" v-model="email" />
    <input class="input" :placeholder="passwordText" v-model="password" />
    <input class="submit" type="submit" :value="this.submitButtonText" />
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
      this.$router.push('/home');
    },

    routeToSignup() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style scoped lang="scss">
.input-form {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}

.input {
  margin-top: 5px;
}

.submit {
  margin-top: 10px;
}
</style>
