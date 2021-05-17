module.exports = {
  index: {
    // 모바일 웹 메인
    entry: 'src/frontend/main.ts',
    ssrEntry: 'src/frontend/ssr_main.ts',
    template: 'templates/index.html', // 원본 템플릿 파일
    // publishTemplate: 'stub/index.html', // 퍼블리시 모드에서 사용할 템플릿 파일
    filename: 'templates/dist/index.html', // 빌드 후 템플릿 파일
    path: ['/*'], // dev 모드 프록시에 적용할 path
  },
};
