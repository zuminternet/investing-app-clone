<template>
  <div class="multipurpose-header">
    <div class="header-title-box">
      <p>{{ title }}</p>
      <custom-text :message="marketName"></custom-text>
    </div>
    <div class="empty-space"></div>
    <div class="header-button-box">
      <button class="header-button"></button>
      <button class="header-button"></button>
      <button class="header-button"></button>
    </div>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue'

export default {
  name:"MultipurposeHeader",
  components: {
    CustomText
  },
  data: function() {
    return {
      title: 'investing.com',
      marketName:'홍콩'
    }
  }
}
</script>

<style scoped>
  .multipurpose-header {
    display: flex;
    height: 50px;

  }

  .header-title-box {
    display: flex;
    flex-direction: column;
  }

  .empty-space {
    flex: 1;
  }

  .header-button-box {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
  }

  .header-button {
    width: 30px;
    height: 30px;
    background-color: green;
    margin-right: 10px;
  }
</style>