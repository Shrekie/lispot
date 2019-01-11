const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
    new VueLoaderPlugin()
  ]

}