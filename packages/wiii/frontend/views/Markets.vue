<template>
  <div>
    <h1>Markets</h1>
    <h3>{{ this.$route.params.detail }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },

  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style lang="scss" scoped>
//
</style>
