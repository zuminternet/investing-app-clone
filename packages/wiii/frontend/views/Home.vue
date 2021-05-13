<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      message: 'hello jest',
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  color: blueviolet;
}
</style>
