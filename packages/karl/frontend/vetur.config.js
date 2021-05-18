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
      root: './packages/karl',
      package: './package.json',
      // tsconfig 파일 위치 (root 속성의 상대경로)
      tsconfig: './tsconfig.json',
      snippetFolder: './.vscode/vetur/snippets',
      globalComponents: [],
    },
  ],
};
