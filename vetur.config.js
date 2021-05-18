/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
  },
  projects: [
    {
      root: './packages/wiii',
      package: './package.json',
      tsconfig: './tsconfig.frontend.json',
      globalComponents: ['./frontend/components/**/*.vue'],
    },
  ],
};
