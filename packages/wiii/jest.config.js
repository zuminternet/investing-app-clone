module.exports = {
  // 현재 core 라이브러리에는 없으므로 설치 필요
  preset: '@vue/cli-plugin-unit-jest',

  // 확장자별 테스트 라이브러리 지정
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },

  testMatch: ['**/__tests__/**/*.js'],

  // 테스트 대상 파일
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],

  // 테스트 제외 패턴
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/resources',
    '<rootDir>/coverage',
    'config.js',
    '.babelrc.js',
    'vue.page.js',
    '.eslintrc.*',
  ],

  // module alias
  // __test__ 디렉토리를 component 디렉토리 밖에 만드는 경우 필수
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/frontend/$1',
  },

  //
  // setupFilesAfterEnv: ['jest-plugin-context/setup'],

  // 테스트 환경
  // testEnvironment: 'jest-environment-jsdom-sixteen',

  // 전역 설정 파일; SCSS 등
  globals: {
    'vue-jest': {
      resources: {
        scss: ['./frontend/styles/index.scss'],
      },
    },
  },

  // string | number, 최대 CPU 가동률
  maxWorkers: '70%',

  verbose: true,
  // 커버리지 보고 싶을 때
  // collectCoverage: true,
  // js, ts, vue만 포함, node_modules 제외
  // collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
};
