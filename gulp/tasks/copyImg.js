// const { src } = require('gulp');
const config = require('./../config.js');
const fileExist = require('./../fileExist.js');
const cpy = require('cpy');


module.exports = function copyImg(cb) {
  let copiedImages = [];
  blocksFromHtml.forEach(function(block) {
    let src = `${config.dir.blocks}${block}/img`;
    if(fileExist(src)) copiedImages.push(src);
  });
  config.alwaysAddBlocks.forEach(function(block) {
    let src = `${config.dir.blocks}${block}/img`;
    if(fileExist(src)) copiedImages.push(src);
  });
  if(copiedImages.length) {
    (async () => {
      await cpy(copiedImages, `${config.dir.build}img/`);
      cb();
    })();
  }
  else {
    cb();
  }
}
