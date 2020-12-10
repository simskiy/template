const browserSync = require('browser-sync');

module.exports = function reload(done) {
  browserSync.reload();
  done();
}
