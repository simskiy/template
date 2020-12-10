const config = require('./../config.js');
const getDirectories = require('./../getDirectories.js');
const replace = require('gulp-replace');
const fs = require('fs');

module.exports = function writeJsRequiresFile(cb) {
  const jsRequiresList = [];
  config.addJsBefore.forEach(function(src) {
    jsRequiresList.push(src);
  });
  const allBlocksWithJsFiles = getDirectories('js');
  allBlocksWithJsFiles.forEach(function(blockName){
    if (config.alwaysAddBlocks.indexOf(blockName) == -1) return;
    jsRequiresList.push(`../blocks/${blockName}/${blockName}.js`)
  });
  allBlocksWithJsFiles.forEach(function(blockName){
    let src = `../blocks/${blockName}/${blockName}.js`
    if (blocksFromHtml.indexOf(blockName) == -1) return;
    if (jsRequiresList.indexOf(src) > -1) return;
    jsRequiresList.push(src);
  });
  config.addJsAfter.forEach(function(src) {
    jsRequiresList.push(src);
  });
  let msg = config.mode == 'production' ? '' : `\n/*!*${config.msg.doNotEditMsg.replace(/\n /gm,'\n * ').replace(/\n\n$/,'\n */\n\n')}`;
  // let jsRequires = msg + '\n\n';
  let jsRequires = msg;
  jsRequiresList.forEach(function(src) {
    jsRequires += `require('${src}');\n`;
  });
  jsRequires += msg;
  fs.writeFileSync(`${config.dir.src}js/entry.js`, jsRequires);
  console.log('---------- Write new entry.js');
  cb();
}
