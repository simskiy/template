const config = require('./../config.js');
const cpy = require('cpy');

module.exports = function copyAssets(cb) {
  for (let item in config.addAssets) {
    let dest = `${config.dir.build}${config.addAssets[item]}`;
    cpy(item, dest);
  }
  cb();
}
