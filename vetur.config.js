/**
 * vetur.config.js
 *
 * https://vuejs.github.io/vetur/guide/setup.html#advanced
 *
 * Monorepo 환경에서는 projects 속성에 각 프로젝트를 등록해야 함
 */

/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
  },
  projects: [
    {
      // 프로젝트 위치
      root: './packages/common',
      package: './package.json',
      // tsconfig 파일 위치 (root 속성의 상대경로)
      tsconfig: './frontend/tsconfig.json',
      snippetFolder: './.vscode/vetur/snippets',
      globalComponents: [],
    },
    {
      root: './packages/dogyeong',
      package: './package.json',
      tsconfig: './src/frontend/tsconfig.json',
      snippetFolder: './.vscode/vetur/snippets',
      globalComponents: [],
    },
    {
      // 프로젝트 위치
      root: './packages/karl',
      package: './package.json',
      // tsconfig 파일 위치 (root 속성의 상대경로)
      tsconfig: './tsconfig.json',
      snippetFolder: './.vscode/vetur/snippets',
      globalComponents: [],
    },
    {
      root: './packages/wiii',
      package: './package.json',
      tsconfig: './tsconfig.frontend.json',
      globalComponents: [],
    },
  ],
};
