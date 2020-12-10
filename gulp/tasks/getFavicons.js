const { src, dest } = require('gulp');
const favicons = require('gulp-favicons');
const config = require('./../config');

//Генерация фавиконок. Размер картинки должен быть не меньше 1024х1024
module.exports = function getFavicons(cb) {
  let faviconFile = `${config.dir.src}favicon/in/*.{jpg,jpeg,png,gif}`;
  return src(faviconFile)
    .pipe(favicons({
      icons: {
        appleIcon: true,
          favicons: true,
          online: false,
          appleStartup: false,
          android: false,
          firefox: false,
          yandex: false,
          windows: false,
          coast: false
            }
        }))
    .pipe(dest(`${config.dir.src}favicon/out/`));
}
