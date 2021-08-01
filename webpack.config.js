const path = require('path');

  module.exports = {
  mode: 'production',
  entry: './popup.js',
  output: {
      path: path.resolve(__dirname),
      filename: 'main.js',
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