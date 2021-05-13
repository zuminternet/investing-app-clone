module.exports = {
  plugins: ['@babel/plugin-transform-modules-commonjs'],
  presets: ['@vue/app'],
  env: {
    test: {
      presets: [['@babel/preset-env', { debug: true }]],
    },
  },
};
