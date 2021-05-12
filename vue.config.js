const { modeConfigurer } = require('zum-portal-core/frontend/config/configUtils');

/**
 * 커스텀 Vue CLI 옵션
 * 필요에 따라 덮어 씌울 옵션을 설정한다.
 */
module.exports = modeConfigurer({
  css: {
    loaderOptions: {
      sass: {
        data: [
          'common/frontend/styles/index',
          'dogyeong/frontend/styles/index',
          'karl/frontend/styles/index',
          'wiii/frontend/styles/index',
        ],
      },
    },
    extract: !process.env.ZUM_FRONT_MODE,
  },
});
