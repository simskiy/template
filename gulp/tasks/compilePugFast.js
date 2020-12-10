const { src, dest, lastRun} = require('gulp');
const config = require('./../config.js');
const debug = require('gulp-debug');
const replace = require('gulp-replace');
const through2 = require('through2');
const getClassesToBlocksList = require('./../getClassesToBlocksList.js');
const prettyHtml = require('gulp-pretty-html');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');

module.exports = function compilePugFast() {
  const fileList = [
    `${config.dir.src}pages/**/*.pug`
  ];
  return src(fileList, { since: lastRun(compilePugFast) })
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
