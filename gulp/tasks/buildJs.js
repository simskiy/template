const {src, dest} = require('gulp');
const config = require('./../config.js');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');

module.exports = function BuildJs() {
  const entryList = {
    'script': `./${config.dir.src}js/entry.js`,
  };
  return src(`${config.dir.src}js/entry.js`)
    .pipe(plumber())
    .pipe(webpackStream({
      mode: config.mode,
      entry: entryList,
      output: {
        filename: '[name].js',
      },
      devtool: 'eval',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      // externals: {
      //   jquery: 'jQuery'
      // }
    }))
    .pipe(dest(`${config.dir.build}js`));
}
