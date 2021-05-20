<template>
  <div>
    <template v-if="itemDetailInformations">
      <div class="multipurpose-header">
        <div class="header-button-box">
          <button class="header-button"></button>
        </div>
        <div>
          <div>
            <custom-text>{{itemDetailInformations.itemName}}</custom-text>
          </div>
          
          <div>
            <custom-text>{{itemDetailInformations.itemCategory}}</custom-text>
          </div>
        </div>
        <div class="empty-space"></div>
        <div class="header-button-box">
          <button class="header-button"></button>
          <button class="header-button"></button>
          <button class="header-button"></button>
        </div>
      </div>
    </template>
    
    <template v-else>
      <div class="multipurpose-header">
        <div class="header-title-box">
          <p>{{ title }}</p>
        </div>
        <div class="empty-space"></div>
        <div class="header-button-box">
          <button class="header-button"></button>
        </div>
      </div>
    </template>
    
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue'

export default {
  name:"MultipurposeHeader",
  components: {
    CustomText
  },
  props: ['itemDetailInformations'],
  data: function() {
    return {
      title: 'investing.com',
      marketName:'홍콩'
    }
  }
}
</script>

<style scoped lang="scss">
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