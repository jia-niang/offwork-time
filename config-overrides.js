const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  addBabelPlugins,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        noIeCompat: true,
        javascriptEnabled: true,
      },
    }),

    addWebpackAlias({
      '@': 'src/',
      '@def': 'src/def/',
      '@utils': 'src/utils/',
      '@pages': 'src/pages/',
      '@router': 'src/router/',
      '@assets': 'src/assets/',
      '@components': 'src/components/',
      '@hooks': 'src/hooks/',
    }),

    addBabelPlugins(['@emotion']),

    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    })
  ),
}
