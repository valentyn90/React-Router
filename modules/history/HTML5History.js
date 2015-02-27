/* jshint -W058 */
var assign = require('react/lib/Object.assign');
var LocationActions = require('../LocationActions');
var { getWindowPath } = require('../DOMUtils');
var DOMHistory = require('./DOMHistory');

var isListening = false;

function onPopState(event) {
  if (event.state === undefined)
    return; // Ignore extraneous popstate events in WebKit.

  HTML5History.notifyChange(LocationActions.POP);
}

/**
 * A history implementation for DOM environments that support the
 * HTML5 history API (pushState and replaceState). Provides the cleanest
 * URLs. This implementation should always be used if possible.
 */
var HTML5History = assign(new DOMHistory, {

  addChangeListener(listener) {
    DOMHistory.prototype.addChangeListener.call(this, listener);

    if (!isListening) {
      if (window.addEventListener) {
        window.addEventListener('popstate', onPopState, false);
      } else {
        window.attachEvent('onpopstate', onPopState);
      }

      isListening = true;
    }
  },

  removeChangeListener(listener) {
    DOMHistory.prototype.removeChangeListener.call(this, listener);

    if (this.changeListeners.length === 0) {
      if (window.addEventListener) {
        window.removeEventListener('popstate', onPopState, false);
      } else {
        window.removeEvent('onpopstate', onPopState);
      }

      isListening = false;
    }
  },

  pushState(state, path) {
    window.history.pushState(state, '', path);
    this.notifyChange(LocationActions.PUSH);
  },

  replaceState(state, path) {
    window.history.replaceState(state, '', path);
    this.notifyChange(LocationActions.REPLACE);
  },

  getCurrentPath: getWindowPath,

  getCurrentState() {
    return window.history.state;
  }

});

module.exports = HTML5History;
