<template>
  <form class="input-form" @submit.prevent="submitForEmailLogin">
    <input class="input" :placeholder="emailText" v-model="email" />
    <input class="input" :placeholder="passwordText" v-model="password" />
    <input class="submit" type="submit" :value="emailLogin" />
  </form>
</template>

<script>
import { text } from '../../../common/frontend/constants';
import { loginUserByEmail, getUser } from '../apis';

export default {
  name: 'LoginPasswordInputForm',

  data() {
    const { EMAIL, PASSWORD, EMAIL_LOGIN } = text;
    return {
      email: '',
      password: '',

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
    async submitForEmailLogin(event) {
      try {
        const result = await loginUserByEmail({ email: this.email, password: this.password });

        if (result.status === 200) {
          this.routeToHome();

          // 여기에 이후 dispatch 문이 들어감
          return;
        }

        throw new Error('invalid user');
      } catch (error) {
        console.log(error);
        alert(error);
      }
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
