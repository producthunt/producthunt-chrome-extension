/**
 * Dependencies.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var envc = require('envc')({ nodeenv: 'test' });
var path = require('path');

// setup chai and wd
global.wd = require('wd');

chaiAsPromised.transferPromiseness = wd.transferPromiseness;
chai.use(chaiAsPromised);
chai.should();

// global configs
global.TEST = {
  path: path.join(__dirname, '..', 'build'),
  url: 'chrome-extension://' + process.env.EXTENSION_ID
};
