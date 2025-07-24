const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {banner: './js/banner.js',}, output: { path: path.resolve(__dirname, 'dist'), filename: 'js/banner.js',clean: true},};