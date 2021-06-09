<template>
  <div id="login" class="area center">
    <Words class="subtitle card noselect">로그인 해주세요</Words>

    <form method="post" class="area login-form">
      <Label :forId="'login-email'" class="login-form-label">Email</Label>
      <Input id="login-email" :type="'email'" autofocus required></Input>
      <Label :forId="'login-password'" class="login-form-label">Password</Label>
      <Input id="login-password" :type="'password'" required></Input>
      <div class="user-buttons">
        <Link :href="'/user/join'" :name="'가입하기'" />
        <Link :href="'/user/'" :name="'로그인'" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Words from '@/components/atoms/Words.vue';
import Label from '@/components/atoms/Label.vue';
import Input from '@/components/atoms/Input.vue';
import Link from '@/components/molecules/UserAuthLink.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'UserLoginTemplate',

  components: { Words, Label, Link, Input },

  data() {
    return {
      //
    };
  },
});
</script>

<style lang="scss" scoped>
#login {
  .login-form {
    &-label {
      padding: 0 15px;
    }

    .user-buttons {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
