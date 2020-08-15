const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = env => {
  console.log(env.MODE)
  global.nodeMode = env.MODE
  return {
    context: path.join(__dirname),
    entry: path.resolve(__dirname, 'assets') + '/js/app.js',
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()]
    },
    performance: { hints: false },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/app.js',
      publicPath: '/build/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require('dart-sass')
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: '[id].css',
        path: path.resolve(__dirname, 'build', 'css')
      })
    ]
  }
}
