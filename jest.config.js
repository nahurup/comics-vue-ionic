module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  devServer: {
    disableHostCheck: true,
  },
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router)']
}
