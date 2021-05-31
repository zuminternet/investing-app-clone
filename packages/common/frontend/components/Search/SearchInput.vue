<template>
  <input class="search-input" :placeholder="`${product} ${search}`" />
</template>

<script>
import { text } from '../../constants';

export default {
  name: 'SearchInput',

  data() {
    const { PRODUCT, SEARCH } = text;

    return {
      product: PRODUCT,
      search: SEARCH,
    };
  },
};
</script>

<style scoped lang="scss">
.search-input {
  height: 30px;
  flex: 1;
}
</style>
