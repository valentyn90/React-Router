var invariant = require('react/lib/invariant');
var LocationActions = require('../LocationActions');
var History = require('./History');

function createEntry(object) {
  return typeof object === 'string' ? { path: object, state: null } : object;
}

/**
 * A history implementation that is convenient for testing. Allows
 * you to specify all history entries at creation time, as well as
 * the current index in the history to start from.
 */
class TestHistory extends History {

  /**
   * If entries is given it must be an array of either paths (strings)
   * or { path, state } objects.
   */
  constructor(entries, startingIndex) {
    this.entries = (entries || []).map(createEntry);
    this.index = startingIndex || this.entries.length - 1;
  }

  get length() {
    return this.entries.length;
  }

  canGo(n) {
    if (n === 0)
      return true;

    var nextIndex = this.index + n;
    return nextIndex >= 0 && nextIndex < this.length;
  }

  go(n) {
    if (n === 0)
      return;

    invariant(
      this.canGo(n),
      'Cannot go(%s); there is not enough history',
      n
    );

    this.index += n;

    this.notifyChange(LocationActions.POP);
  }

  pushState(state, path) {
    this.entries.push({ path, state });
    this.notifyChange(LocationActions.PUSH);
  }

  replaceState(state, path) {
    invariant(
      this.length > 0,
      'You cannot use replaceState with no history'
    );

    this.entries[this.index] = { path, state };

    this.notifyChange(LocationActions.REPLACE);
  }

  getCurrentPath() {
    return this.getCurrentEntry().path;
  }

  getCurrentState() {
    return this.getCurrentEntry().state;
  }

  getCurrentEntry() {
    return this.entries[this.index];
  }

}

module.exports = TestHistory;
