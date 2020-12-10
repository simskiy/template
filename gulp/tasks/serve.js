const {watch, parallel, series} = require('gulp');
const config = require('./../config.js');
const reload = require('./../reload.js');
const fs = require('fs');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');
const compilePug = require('./compilePug.js');
const compilePugFast = require('./compilePugFast.js');
const writePugMixinsFile = require('./writePugMixinsFile.js');
const writeSassImportsFile = require('./writeSassImportsFile');
const writeJsRequiresFile = require('./writeJsRequiresFile.js');
const compileSass = require('./compileSass.js');
const buildJs = require('./buildJs.js');
const copyImg = require('./copyImg.js');
const generateSvgSprite = require('./generateSvgSprite.js');
const generatePngSprite = require('./generatePngSprite.js');
const createSmartGrid = require('./createSmartGrid.js');


module.exports = function serve() {
  browserSync.init({
    server: config.dir.build,
    port: 8080,
    startPath: 'index.html',
    open: false,
    notify: false,
  });

  // Страницы: изменение, добавление
  watch([`${config.dir.src}pages/**/*.pug`], { events: ['change', 'add'], delay: 100 }, series(
    compilePugFast,
    parallel(writeSassImportsFile, writeJsRequiresFile),
    parallel(compileSass, buildJs),
    reload
  ));

  // Страницы: удаление
  watch([`${config.dir.src}pages/**/*.pug`], { delay: 100 })
  // TODO попробовать с events: ['unlink']
    .on('unlink', function(path) {
      let filePathInBuildDir = path.replace(`${config.dir.src}pages/`, config.dir.build).replace('.pug', '.html');
      fs.unlink(filePathInBuildDir, (err) => {
        if (err) throw err;
        console.log(`---------- Delete:  ${filePathInBuildDir}`);
      });
    });

  // Разметка Блоков: изменение
  watch([`${config.dir.blocks}**/*.pug`], { events: ['change'], delay: 100 }, series(
    compilePug,
    reload
  ));

  // Разметка Блоков: добавление
  watch([`${config.dir.blocks}**/*.pug`], { events: ['add'], delay: 100 }, series(
    writePugMixinsFile,
    compilePug,
    reload
  ));

  // Разметка Блоков: удаление
  watch([`${config.dir.blocks}**/*.pug`], { events: ['unlink'], delay: 100 }, writePugMixinsFile);

  // Шаблоны pug: все события
  watch([`${config.dir.src}pug/**/*.pug`, `!${config.dir.src}pug/mixins.pug`], { delay: 100 }, series(
    compilePug,
    parallel(writeSassImportsFile, writeJsRequiresFile),
    parallel(compileSass, buildJs),
    reload,
  ));

  // Стили Блоков: изменение
  watch([`${config.dir.blocks}**/*.scss`], { events: ['change'], delay: 100 }, series(
    compileSass,
    reload
  ));

  // Стили Блоков: добавление
  watch([`${config.dir.blocks}**/*.scss`], { events: ['add'], delay: 100 }, series(
    writeSassImportsFile,
    compileSass,
    reload
  ));

  // Стилевые глобальные файлы: все события
  watch([`${config.dir.src}scss/**/*.scss`, `!${config.dir.src}scss/style.scss`], { events: ['all'], delay: 100 }, series(
    compileSass,
    reload
  ));

  // Скриптовые глобальные файлы: все события
  watch([`${config.dir.src}js/**/*.js`, `!${config.dir.src}js/entry.js`, `${config.dir.blocks}**/*.js`], { events: ['all'], delay: 100 }, series(
    writeJsRequiresFile,
    buildJs,
    reload
  ));

  // Картинки: все события
  watch([`${config.dir.blocks}**/img/*.{jpg,jpeg,png,gif,svg,webp}`], { events: ['all'], delay: 100 }, series(copyImg, reload));

  // Спрайт SVG
  watch([`${config.dir.src}img/sprite-svg/svg/*.svg`], { events: ['all'], delay: 100 }, series(
    generateSvgSprite,
    copyImg,
    reload,
  ));

  // Спрайт PNG
  watch([`${config.dir.src}img/sprite-png/png/*.png`], { events: ['all'], delay: 100 }, series(
    generatePngSprite,
    copyImg,
    compileSass,
    reload,
  ));

  //smart-grid
  watch([`gulp/configSmartgrid.js`], {events: ['all'], delay: 100}, series(
    createSmartGrid,
    reload,
    ));
}
