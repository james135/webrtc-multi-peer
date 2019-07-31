const path = require('path');

module.exports = {
  entry: {
    chat: './src/socket/chat.ts',
    video: './src/socket/video.ts',
    home: './src/home/index.ts'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  }
};