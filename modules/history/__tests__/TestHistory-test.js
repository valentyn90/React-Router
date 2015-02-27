var describeHistory = require('./describeHistory');
var TestHistory = require('../TestHistory');

describe('TestHistory', function () {
  describeHistory(new TestHistory());
});
