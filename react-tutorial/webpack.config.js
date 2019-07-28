'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var InterpolateHtmlPlugin = require('interpolate-html-plugin');

const CleanPlugin = require('./config/clean-plugin');
const NodeUtils = require('./config/node-service');

const appConfig = require('./config/config');

const APP_DIR = path.join(__dirname, 'src');

/**
 * Get webpack plugins
 * @returns {*[]}
 */
function getPlugins () {
  return [
    // Clear the output dir before builds
    new CleanPlugin({
      files: ['dicts/*']
    }),

    // Extract CSS to a separate file
    new MiniCssExtractPlugin({
      filename: !NodeUtils.isDevelopment() ? '[name].[hash].css' : '[name].css',
      chunkFilename: !NodeUtils.isDevelopment() ? '[id].[hash].css' : '[id].css'
    }),

    // Ignore moment locales
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    
    // Inject bundles and CSS directly into the HTML template
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true
    }),

    new InterpolateHtmlPlugin({
        PUBLIC_URL: path.resolve(__dirname, 'public')
      }),

    // Pass NODE_ENV and APP_CONFIG to application
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          process.env.NODE_ENV
        ),
        // PUBLIC_URL: JSON.stringify(
        //   path.resolve(__dirname, 'public')
        // ),
        APP_CONFIG: JSON.stringify(
          appConfig
        )
      }
    })
  ];
}

function getCodeSplittingConfig () {
  return {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  };
}

/**
 * Get Webpack file parsing rules
 * @returns {*[]}
 */
function getParserRules () {
  const devSassLoaders = ['style-loader', 'css-loader'];

//   // Extract CSS and autoprefix
//   const prodSassLoaders = [
//     MiniCssExtractPlugin.loader, 'css-loader',
//     {
//       loader: 'postcss-loader',
//       options: {
//         plugins: () => [
//           autoprefixer({
//             browsers: ['last 2 version']
//           })
//         ]
//       }
//     }, 'sass-loader'];

  return [
    // {
    //     exclude: [
    //         /\.html$/,
    //         /\.(js|jsx)$/,
    //         /\.css$/,
    //         /\.json$/,
    //         /\.woff$/,
    //         /\.woff2$/,
    //         /\.(ttf|svg|eot)$/
    //     ],
    //     loader: 'url',
    //     query: {
    //         limit: 10000,
    //         name: 'static/media/[name].[hash:8].[ext]'
    //     }
    // },
    {
      test: /\.(js|jsx)$/,
      loaders: 'babel-loader',
      // include: APP_DIR
    },
    // {
    //   test: /\.scss$/,
    //   use: !NodeUtils.isDevelopment() ? prodSassLoaders : devSassLoaders,
    //   include: APP_DIR
    // },
    {
        test: /\.css$/,
        loader: devSassLoaders,
        include: APP_DIR
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
      // include: path.join(__dirname, 'public')
    },
    {
      test: /\.(ico|flac)$/,
      loader: 'file-loader?name=[name].[ext]',
      // include: path.join(__dirname, 'public')
    },
    {
      type: 'javascript/auto',
      test: /\.json$/,
      loader: 'file-loader?name=[name].[ext]',
      // include: path.join(__dirname, 'public')
    }
  ];
}

const webpackConfig = {};

// Configure the output directory and bundle name
webpackConfig.output = {
  path: path.join(__dirname, 'dicts'),
  filename: '[name].[hash].js'
};

// Allow webpack to automatically resolve import extensions
webpackConfig.resolve = {
  extensions: ['.js', '.jsx', '.json']
};

// Set up code splitting
webpackConfig.optimization = getCodeSplittingConfig();

// Set webpack plugins
webpackConfig.plugins = getPlugins();

// Set up file parsing rules
webpackConfig.module = {
  rules: getParserRules()
};

// Add additional configurations based on NODE_ENV

if (!NodeUtils.isDevelopment()) {
  webpackConfig.entry = './src/index';
  webpackConfig.mode = 'production';  
  plugins: [
		webpackConfig.plugins,
	]
} else {
  
  webpackConfig.devtool = 'eval';
  webpackConfig.mode = 'development';
  webpackConfig.entry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${appConfig.deepfakequiz.port}`,
    'webpack/hot/only-dev-server',
    './src/index'
  ];
  
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = webpackConfig;
