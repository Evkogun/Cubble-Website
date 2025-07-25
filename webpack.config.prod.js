const { merge }           = require('webpack-merge');
const common              = require('./webpack.common.js');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CopyPlugin          = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ template: './HTML/index.html',  filename: 'index.html'  }),
    new HtmlWebpackPlugin({ template: './HTML/apps.html',   filename: 'apps.html'   }),
    new HtmlWebpackPlugin({ template: './HTML/about.html',  filename: 'about.html'  }),
    new HtmlWebpackPlugin({ template: './HTML/team-map.html', filename: 'team-map.html' }),

    new CopyPlugin({
      patterns: [
        { from: 'HTML/footer.html',    to: ''                 },
        { from: 'HTML/banner.html',    to: ''                 },
        { from: 'js',                  to: 'js'               },
        { from: 'img',                 to: 'img'              },
        { from: 'css',                 to: 'css'              },
        { from: 'icon.svg',            to: 'icon.svg'         },
        { from: 'favicon.ico',         to: 'favicon.ico'      },
        { from: 'robots.txt',          to: 'robots.txt'       },
        { from: 'icon.png',            to: 'icon.png'         },
        { from: '404.html',            to: '404.html'         },
        { from: 'site.webmanifest',    to: 'site.webmanifest' },
      ],
    }),
  ],
});