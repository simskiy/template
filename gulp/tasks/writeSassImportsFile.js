// const {src} = require('gulp');
const config = require('./../config.js');
const fileExist = require('./../fileExist.js');
const getDirectories = require('./../getDirectories.js');
const getArraysDiff = require('./../getArraysDiff.js');
const replace = require('gulp-replace');
const fs = require('fs');
// let msg = '';


module.exports = function writeSassImportsFile(cb) {
  const newScssImportsList = [];
  config.addStyleBefore.forEach(function(src) {
    newScssImportsList.push(src);
  });
  config.alwaysAddBlocks.forEach(function(blockName) {
    if (fileExist(`${config.dir.blocks}${blockName}/${blockName}.scss`)) newScssImportsList.push(`${config.dir.blocks}${blockName}/${blockName}.scss`);
  });
  let allBlocksWithScssFiles = getDirectories('scss');
  allBlocksWithScssFiles.forEach(function(blockWithScssFile){
    let url = `${config.dir.blocks}${blockWithScssFile}/${blockWithScssFile}.scss`;
    if (blocksFromHtml.indexOf(blockWithScssFile) == -1) return
    if (newScssImportsList.indexOf(url) > -1) return;
    newScssImportsList.push(url);
  });
  config.addStyleAfter.forEach(function(src) {
    newScssImportsList.push(src);
  });
  let diff = getArraysDiff(newScssImportsList, scssImportsList);
  if (diff.length) {
   let msg = config.mode == 'production' ? '' : `\n/*!*${config.msg.doNotEditMsg.replace(/\n /gm,'\n * ').replace(/\n\n$/,'\n */\n\n')}`
    // let msg = `\n/*!*${config.msg.doNotEditMsg.replace(/\n /gm,'\n * ').replace(/\n\n$/,'\n */\n\n')}`;
    let styleImports = msg;
    newScssImportsList.forEach(function(src) {
      styleImports += `@import "${src}";\n`;
    });
    styleImports += msg;
    fs.writeFileSync(`${config.dir.src}scss/style.scss`, styleImports);
    console.log('---------- Write new style.scss');
    scssImportsList = newScssImportsList;
  }
  cb();
}
