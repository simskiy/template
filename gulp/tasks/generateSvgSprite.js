const config = require('./../config.js');
const { src, dest } = require('gulp');
const fileExist = require('./../fileExist.js');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');

// Файлы svg для спрайта надо ложить в папку sprite/svg
// Готовый спрайт генерируется в папку img/svg

module.exports = function generateSvgSprite(cb) {
  let spriteSvgPath = `${config.dir.src}sprite/svg/in/`;
  if(config.alwaysAddBlocks.indexOf('sprite-svg') > -1 && fileExist(spriteSvgPath)) {
    return src(spriteSvgPath + '*.svg')
      .pipe(svgmin(function () {
        return { plugins: [{ cleanupIDs: { minify: true } }] }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite.svg'))
      .pipe(dest(`${config.dir.src}sprite/svg/out/`));
  }
  else {
    cb();
  }
}
