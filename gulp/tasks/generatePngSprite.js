// не работает.
// Исправить

const config = require('./../config.js');
const {src, dest} = require('gulp');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

module.exports = function generatePngSprite(cb) {
  let spritePngPath = `${config.dir.img}sprite-png/png/`;
  if(config.alwaysAddBlocks.indexOf('sprite-png') > -1 && fileExist(spritePngPath)) {
    del(`${config.dir.img}sprite-png/png/*.png`);
    let fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
    let spriteData = src(spritePngPath + '*.png')
      .pipe(spritesmith({
        imgName: fileName,
        cssName: 'sprite-png.scss',
        padding: 4,
        imgPath: '../img/' + fileName
      }));
    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin([ imagemin.optipng({ optimizationLevel: 5 }) ]))
      .pipe(dest(`${config.dir.img}sprite-png/img`));
    let cssStream = spriteData.css
      .pipe(dest(`${config.dir.img}`));
    return merge(imgStream, cssStream);
  }
  else {
    cb();
  }
}
