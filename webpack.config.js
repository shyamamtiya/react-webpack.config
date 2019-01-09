const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack =require('webpack');
const fs = require('fs');
module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    plugins: [
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        maxSize:1000000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(png|jpg|gif|jpeg|ttf|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                 name:'[path][name].[ext]',

                }
              }
            ]
          },
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: "style-loader" // creates style nodes from JS strings
              },
              {
                loader: "css-loader" // translates CSS into CommonJS
              },
              {
                loader: "sass-loader" // compiles Sass to CSS
              }
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./public/index.html",
          inject:'body',
          filename: "./index.html",
          async: ['index', 'vendor'],
          defer: ['thirdparty']
        })
      ]
  };

var dir = './dist';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.copyFile('./public/favicon.ico', './dist/favicon.ico', (err) => {
      if (err) throw err;
      console.log('favicon.ico was copied to ./dist/favicon.ico');
    });
    fs.copyFile('./public/manifest.json', './dist/manifest.json', (err) => {
      if (err) throw err;
      console.log('manifest.json was copied to ./dist/manifest.json');
    });
}
  