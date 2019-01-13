const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {

  entry: [
    './src/index.js'
  ],

  mode: 'development',

  module: {

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.js$/,
        loader: 'babel-loader'
      },

      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
    
  },

  plugins: [
    
    new VueLoaderPlugin(),

    new NodemonPlugin({

      script: '../server/index.js',

      watch: [
        path.resolve('./dist'), 
        path.resolve('./../server')
      ]

    })

  ]

}