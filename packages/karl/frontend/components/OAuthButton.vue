<template>
  <button class="oauth-button" @click="$emit('handle-auth-click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'OAuthButton',
  props: ['textColor', 'backgroundColor'],
};
</script>

<style scoped lang="scss">
.oauth-button {
  background-color: red;
  display: flex;
  height: 30px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: center;
}
</style>
