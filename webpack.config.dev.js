const path              = require('path');
const { merge }         = require('webpack-merge');
const common            = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin        = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot:     true,
    open:    true,
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({ template: './HTML/index.html',  filename: 'index.html' }),
    new HtmlWebpackPlugin({ template: './HTML/apps.html',   filename: 'apps.html'  }),
    new HtmlWebpackPlugin({ template: './HTML/about.html',  filename: 'about.html' }),
    new HtmlWebpackPlugin({ template: './HTML/team-map.html', filename: 'team-map.html' }),
    new HtmlWebpackPlugin({ template: './HTML/signUp.html', filename: 'signUp.html' }),

    new CopyPlugin({
      patterns: [
        { from: 'HTML/footer.html',         to: ''                 },
        { from: 'HTML/banner.html',         to: ''                 },
        { from: 'css',                      to: 'css'              },
        { from: 'img',                      to: 'img'              },
        { from: 'js',                       to: 'js'               },
        { from: 'icon.svg',                 to: 'icon.svg'         },
        { from: 'favicon.ico',              to: 'favicon.ico'      },
        { from: 'robots.txt',               to: 'robots.txt'       },
        { from: 'icon.png',                 to: 'icon.png'         },
        { from: '404.html',                 to: '404.html'         },
        { from: 'site.webmanifest',         to: 'site.webmanifest' },
      ]
    })
  ],
});
