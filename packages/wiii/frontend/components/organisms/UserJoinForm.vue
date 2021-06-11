<template>
  <form method="post" class="area login-form" @submit.prevent="joinSubmitHandler">
    <Label :forId="'login-email'" class="login-form-label">Email</Label>
    <Input
      id="login-email"
      :type="'email'"
      :newValue="email"
      @change-input-handler="(e) => changeInputHandler('email')(e)"
      autofocus
      required
    ></Input>
    <Label :forId="'login-password'" class="login-form-label">Password</Label>
    <Input
      id="login-password"
      :type="'password'"
      :newValue="password"
      @change-input-handler="(e) => changeInputHandler('password')(e)"
      required
    ></Input>
    <Label :forId="'login-password'" class="login-form-label">Nickname</Label>
    <Input
      id="login-nickname"
      :type="'text'"
      :newValue="nickname"
      @change-input-handler="(e) => changeInputHandler('nickname')(e)"
      required
    ></Input>
    <Button type="submit" class="user-sign-button">가입하기</Button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Label from '@/components/atoms/Label.vue';
import Input from '@/components/atoms/Input.vue';
import Link from '@/components/atoms/RouterLink.vue';
import Button from '@/components/atoms/Button.vue';
import { createNamespacedHelpers } from 'vuex';
import { StoreNames } from '@/store';

const { mapActions } = createNamespacedHelpers(StoreNames.Auth);

export default Vue.extend({
  name: 'UserJoinForm',

  components: { Label, Input, Link, Button },

  data() {
    return {
      email: '',
      password: '',
      nickname: '',
    };
  },

  methods: {
    ...mapActions(['postSignUp']),

    async joinSubmitHandler() {
      try {
        const { email, password, nickname } = this;
        const isOK = await this.postSignUp({ email, password, nickname });
        console.log(isOK);
        if (!isOK) throw Error();
        alert('가입 성공');
        this.$router.push('/');
      } catch (e) {
        console.error(e);
      }
    },

    changeInputHandler(type: string) {
      return (e) => (this[type] = e.target.value);
    },
  },
});
</script>

<style lang="scss" scoped></style>
