const ghpages = require('gh-pages');
const config = require('./../config.js');

module.exports = function deploy(cb) {
  ghpages.publish(path.join(process.cwd(), config.dir.build), cb);
}
