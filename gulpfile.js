/* global exports process console __dirname Buffer */
/* eslint-disable no-console */
'use strict';

// Проверка количества съедаемой памяти
// setInterval(function(){ // eslint-disable-line
//   let memory = process.memoryUsage()
//   let date = new Date();
//   console.log(`[${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}]`, 'Memory usage (heapUsed):', (memory.heapUsed / 1024 / 1024).toFixed(2) + 'Mb');
// }, 1000 * 10);
// function addZero(i) { return (i < 10) ? i = "0" + i : i;}

// Пакеты, использующиеся при обработке
const { series, parallel } = require('gulp');
const getFavicons = require('./gulp/tasks/getFavicons');
const writePugMixinsFile = require('./gulp/tasks/writePugMixinsFile');
const compilePug = require('./gulp/tasks/compilePug.js');
const compilePugFast = require('./gulp/tasks/compilePugFast.js');
const copyAssets = require('./gulp/tasks/copyAssets.js');
const copyImg = require('./gulp/tasks/copyImg.js');
const config = require('./gulp/config.js');
const writeSassImportsFile = require('./gulp/tasks/writeSassImportsFile.js');
const compileSass = require('./gulp/tasks/compileSass.js');
const writeJsRequiresFile = require('./gulp/tasks/writeJsRequiresFile.js');
const buildJs = require('./gulp/tasks/BuildJs.js');
const serve = require('./gulp/tasks/serve.js');
const clearBuildDir = require('./gulp/tasks/clearBuildDir.js');
const createSmartGrid = require('./gulp/tasks/createSmartGrid.js');
const generateSvgSprite = require('./gulp/tasks/generateSvgSprite.js');

global.scssImportsList = []; // список импортов стилей
global.blocksFromHtml = Object.create(config.alwaysAddBlocks);

exports.build = series(
  parallel(clearBuildDir, writePugMixinsFile),
  parallel(compilePugFast, copyAssets),
  parallel(copyImg, writeSassImportsFile, writeJsRequiresFile),
  parallel(compileSass, buildJs),
);

exports.default = series(
  parallel(clearBuildDir, writePugMixinsFile, createSmartGrid),
  parallel(compilePugFast, copyAssets),
  parallel(copyImg, writeSassImportsFile, writeJsRequiresFile),
  parallel(compileSass, buildJs),
  serve,
);

exports.getFavicons = series(getFavicons);
exports.grid = series(createSmartGrid);
exports.pug = series(writePugMixinsFile, compilePug);
exports.spriteSvg = series(generateSvgSprite);


