var expect = require('expect');
var History = require('../History');

function describeHistory(history) {
  it('is an instanceof History', function () {
    expect(history).toBeA(History);
  });

  // Check for required subclass properties.
  it('has a numeric length property', function () {
    expect(history.length).toBeA('number');
  });

  // Check for required subclass methods.
  [ 'pushState',
    'replaceState',
    'getCurrentPath',
    'getCurrentState',
    'go'
  ].forEach(function (methodName) {
    it(`has a ${methodName} method`, function () {
      expect(history[methodName]).toBeA('function');
    });
  });

  // TODO
}

module.exports = describeHistory;
