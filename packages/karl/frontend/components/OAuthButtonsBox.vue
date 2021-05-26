<template>
  <div class="oauth-buttons-box">
    <o-auth-button>{{ facebookLogin }}</o-auth-button>
    <o-auth-button>{{ googleLogin }}</o-auth-button>
  </div>
</template>

<script>
import OAuthButton from '../components/OAuthButton.vue';
import { text } from '../../../common/frontend/constants';

export default {
  name: 'OAuthButtonsBox',
  components: {
    OAuthButton,
  },

  data() {
    const { FACEBOOK_LOGIN, GOOGLE_LOGIN } = text;
    return {
      facebookLogin: FACEBOOK_LOGIN,
      googleLogin: GOOGLE_LOGIN,
    };
  },
};
</script>

<style scoped lang="scss">
.oauth-buttons-box {
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
