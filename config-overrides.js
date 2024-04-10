const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  addBabelPlugins,
  addWebpackPlugin,
} = require('customize-cra')
const S3Plugin = require('webpack-s3-plugin')
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

    process.env.NODE_ENV === 'production' && process.env.COS_SECRET_ID && process.env.COS_SECRET_KEY
      ? addWebpackPlugin(
          new S3Plugin({
            exclude: /.*\.html$/,
            basePath: 'paperplane-offwork-time',
            s3Options: {
              accessKeyId: process.env.COS_SECRET_ID,
              secretAccessKey: process.env.COS_SECRET_KEY,
              region: 'ap-hongkong',
              endpoint: 'https://cos.ap-hongkong.myqcloud.com',
              apiVersion: '2006-03-01',
            },
            s3UploadOptions: {
              Bucket: 'paperplane-cdn-1253277322',
            },
          })
        )
      : noop,

    process.env.NODE_ENV === 'production' && process.env.COS_SECRET_ID && process.env.COS_SECRET_KEY
      ? function setPublicPath(config) {
          config.output.publicPath = '//cdn.paperplane.cc/paperplane-offwork-time/'

          return config
        }
      : noop
  ),
}
