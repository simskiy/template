const {dest, src} = require('gulp');
const config = require('./../config.js');
const plumber = require('gulp-plumber');
const debug = require('gulp-debug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').create();

module.exports = function compileSass() {
  const fileList = [
    `${config.dir.src}scss/style.scss`,
  ];
  return src(fileList, { sourcemaps: config.mode == 'production' ? false : true })
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(debug({title: 'Compiles:'}))
    .pipe(sass({includePaths: [__dirname+'/','node_modules']}))
    .pipe(postcss(config.postCssPlugins))
    .pipe(csso({
      restructure: true,
    }))
    .pipe(dest(`${config.dir.build}/css`, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}
