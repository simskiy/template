const gulp = require('gulp');
const smartGrid = require('smart-grid');
const path = require('path');
const config = require('./../config.js');
const options = require('./../configSmartgrid.js');

module.exports = function createSmartGrid(done) {
  delete require.cache[path.resolve('./../configSmartgrid.js')];
  console.log('Очистка кэша smart-grid');
  smartGrid(`${config.dir.scss}mixins/`, options);
  done();
}
