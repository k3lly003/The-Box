const path = require('path');
const TerserPlugin = require("terser-webpack-plugin") //will help me to log a diferent msg when am running production.

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    path: path.join(__dirname, 'prod-build'), //I've changed here from dev-build to prod-build
    publicPath: '/',
    filename: '[name].js',
    clean:true
  },
  mode: 'production', //I've changed here from development to production
  target: 'node',
  optimazation   // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ]
  }
}