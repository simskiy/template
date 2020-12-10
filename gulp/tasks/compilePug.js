const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./../config.js');
const debug = require('gulp-debug');
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const replace = require('gulp-replace');
const through2 = require('through2');
const getClassesToBlocksList = require('./../getClassesToBlocksList.js');

module.exports = function compilePug() {
  const fileList = [
    `${config.dir.src}pages/**/*.pug`
  ];
  return src(fileList)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(debug({title: 'Compiles '}))
    .pipe(pug(config.pugOption))
    .pipe(prettyHtml(config.prettyOption))
    .pipe(replace(/^(\s*)(<button.+?>)(.*)(<\/button>)/gm, '$1$2\n$1  $3\n$1$4'))
    .pipe(replace(/^( *)(<.+?>)(<script>)([\s\S]*)(<\/script>)/gm, '$1$2\n$1$3\n$4\n$1$5\n'))
    .pipe(replace(/^( *)(<.+?>)(<script\s+src.+>)(?:[\s\S]*)(<\/script>)/gm, '$1$2\n$1$3$4'))
    .pipe(through2.obj(getClassesToBlocksList))
    .pipe(dest(config.dir.build));
}
