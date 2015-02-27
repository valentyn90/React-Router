/* jshint -W058 */
var assign = require('react/lib/Object.assign');
var LocationActions = require('../LocationActions');
var { getHashPath, withState, withoutStateID, getState } = require('../DOMUtils');
var DOMHistory = require('./DOMHistory');

var currentLocationAction;
var isListening = false;

function ensureSlash() {
  var path = HashHistory.getCurrentPath();

  if (path.charAt(0) === '/')
    return true;

  HashHistory.replace('/' + path);

  return false;
}

function onHashChange() {
  if (ensureSlash()) {
    HashHistory.notifyChange(
      currentLocationAction || LocationActions.POP
    );

    currentLocationAction = null;
  }
}

/**
 * A history implementation for DOM environments that uses window.location.hash
 * to store the current path. This is a hack for older browsers that do not
 * support the HTML5 history API (IE <= 9). It is currently used as the
 * default in DOM environments because it offers the widest range of support.
 */
var HashHistory = assign(new DOMHistory, {

  addChangeListener(listener) {
    DOMHistory.prototype.addChangeListener.call(this, listener);

    // Do this BEFORE listening for hashchange.
    ensureSlash();

    if (!isListening) {
      if (window.addEventListener) {
        window.addEventListener('hashchange', onHashChange, false);
      } else {
        window.attachEvent('onhashchange', onHashChange);
      }

      isListening = true;
    }
  },

  removeChangeListener(listener) {
    DOMHistory.prototype.removeChangeListener.call(this, listener);

    if (this.changeListeners.length === 0) {
      if (window.removeEventListener) {
        window.removeEventListener('hashchange', onHashChange, false);
      } else {
        window.removeEvent('onhashchange', onHashChange);
      }

      isListening = false;
    }
  },

  pushState(state, path) {
    currentLocationAction = LocationActions.PUSH;
    window.location.hash = withState(path, state);
  },

  replaceState(state, path) {
    currentLocationAction = LocationActions.REPLACE;
    window.location.replace(
      window.location.pathname + window.location.search + '#' + withState(path, state)
    );
  },

  getCurrentPath() {
    return withoutStateID(getHashPath());
  },

  getCurrentState() {
    return getState(getHashPath());
  }

});

module.exports = HashHistory;
