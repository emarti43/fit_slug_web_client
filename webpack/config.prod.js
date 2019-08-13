var webpack = require('webpack');
var path = require('path');
var parentDir = path.join(__dirname, '../')
module.exports = {
  mode: 'production',
  entry: [
    path.join(parentDir, 'index.js')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:
            {
              presets: ['@babel/react']
            }
          }
        ],
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
    output: {
      path: parentDir + '/dist',
      filename: 'bundle.js'
  }
}
