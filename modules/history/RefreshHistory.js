/* jshint -W058 */
var assign = require('react/lib/Object.assign');
var { getWindowPath, withState, withoutStateID, getState } = require('../DOMUtils');
var DOMHistory = require('./DOMHistory');

/**
 * A history implementation that can be used in DOM environments
 * that lack support for HTML5 history. Automatically used as the
 * fallback when HTML5 history is desired but not available.
 */
var RefreshHistory = assign(new DOMHistory, {

  pushState(state, path) {
    window.location = withState(path, state);
  },

  replaceState(state, path) {
    window.location.replace(withState(path, state));
  },

  getCurrentPath() {
    return withoutStateID(getWindowPath());
  },

  getCurrentState() {
    return getState(getWindowPath());
  }

});

module.exports = RefreshHistory;
