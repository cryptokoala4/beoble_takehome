const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: '3000',
    static: path.resolve(__dirname, './public'),
    open: true,
    hot: true,
    liveReload: true
  }
};
