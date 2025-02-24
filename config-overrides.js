const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  addBabelPlugins,
  addWebpackPlugin,
} = require('customize-cra')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const noop = require('lodash/identity')

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        noIeCompat: true,
        javascriptEnabled: true,
      },
    }),

    addWebpackAlias({ '@': 'src/' }),

    addBabelPlugins(['@emotion']),

    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),

    addWebpackPlugin(
      new HtmlWebpackTagsPlugin({
        usePublicPath: false,
        links: [
          { path: 'https://cdn.paperplane.cc', attributes: { rel: 'dns-prefetch' } },
          { path: 'https://cdn.paperplane.cc', attributes: { rel: 'preconnect' } },
        ],
      })
    ),

    process.env.NODE_ENV === 'production'
      ? function setPublicPath(config) {
          config.output.publicPath = '//cdn.paperplane.cc/paperplane-offwork-time/'

          return config
        }
      : noop
  ),
}
