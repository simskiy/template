const config = require('./../config.js');
const del = require('del');

module.exports = function clearBuildDir() {
  return del([
    `${config.dir.build}**/*`,
    `!${config.dir.build}readme.md`,
  ]);
}
