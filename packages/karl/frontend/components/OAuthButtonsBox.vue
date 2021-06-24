<template>
  <div class="oauth-buttons-box">
    <o-auth-button @handle-auth-click="handleAuthClick">
      <div>
        <span class="google-icon">&#71;</span>
      </div>
      <div class="ouath-text-box">
        <custom-text OAuthText>
          {{ googleLogin }}
        </custom-text>
      </div>
    </o-auth-button>
  </div>
</template>

<script>
import OAuthButton from '../components/OAuthButton.vue';
import CustomText from 'common/frontend/components/CustomText.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'OAuthButtonsBox',
  components: {
    OAuthButton,
    CustomText,
  },

  props: {
    handleAuthClick: {
      type: Function,
      required: true,
    },
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

.ouath-text-box {
  flex: 1;
}

.google-icon {
  font-size: 25px;
  font-weight: bold;
  color: white;
}
</style>
