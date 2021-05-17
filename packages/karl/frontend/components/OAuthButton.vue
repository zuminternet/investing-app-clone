<template>
    <button class="oauth-button">
      {{ message }}
    </button>
</template>

<script>
export default {
  name: 'OAuthButton',
  props: ['message', 'textColor', 'backgroundColor'],
};
</script>

<style scoped>
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
