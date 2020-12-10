const config = require('./../config.js');
const fs = require('fs');
const getDirectories = require('./../getDirectories.js');
const replace = require('gulp-replace');

module.exports = function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectories('pug');
  let pugMixins = '//-' + config.msg.doNotEditMsg.replace(/\n /gm,'\n  ');
  allBlocksWithPugFiles.forEach(function(blockName) {
    pugMixins += `include ${config.dir.blocks.replace(config.dir.src,'../')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync(`${config.dir.src}pug/mixins.pug`, pugMixins);
  cb();

}
