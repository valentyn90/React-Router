var describeHistory = require('./describeHistory');
var StaticHistory = require('../StaticHistory');

describe('StaticHistory', function () {
  describeHistory(new StaticHistory());
});
