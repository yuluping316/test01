const {
  resolve
} = require('path'); //拼接绝对路劲
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js', //入口
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build') //输出
  },
  module: { //loader配置
    rules: [{
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        enforce:'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }

      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '50',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
   
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            esModule: false,
            name: '[hash:10].[ext]',
            outputPath: 'img/'
          },
        }, ],
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [ //插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  devServer: { //开发服务器npx
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 9000,
    open: true,
  },
  mode: 'development', //模式
  // mode: 'production',
};