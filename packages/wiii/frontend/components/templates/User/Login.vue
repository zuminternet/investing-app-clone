<template>
  <div id="login" class="area center">
    <Words class="subtitle card noselect">로그인 해주세요</Words>
    <Form />
  </div>
</template>

<script lang="ts">
import Words from '@/components/atoms/Words.vue';
import Form from '@/components/organisms/UserLoginForm.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'UserLoginTemplate',

  components: { Words, Form },
});
</script>
