const path = require('path');

  module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
      path: path.resolve(__dirname),
      filename: 'popup.js',
  },
  watch:true,
  module: { 
      rules:[
      { 
          test: /\.css$/,
          use : ['style-loader','css-loader'] 
      } 
      ] 
  }
  };