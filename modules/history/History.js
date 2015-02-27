var Location = require('../Location');

/**
 * An abstract base class for history objects. Requires subclasses
 * to implement the following properties/methods:
 *
 * - length
 * - pushState(state, path)
 * - replaceState(state, path)
 * - getCurrentPath()
 * - getCurrentState()
 * - go(n)
 */
class History {

  addChangeListener(listener) {
    if (!this.changeListeners)
      this.changeListeners = [];

    this.changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    if (!this.changeListeners)
      return;

    this.changeListeners = this.changeListeners.filter(function (li) {
      return li !== listener;
    });
  }

  notifyChange(changeType) {
    if (!this.changeListeners)
      return;

    var location = this.getCurrentLocation();

    for (var i = 0, len = this.changeListeners.length; i < len; ++i)
      this.changeListeners[i].call(this, location, changeType);
  }

  getCurrentLocation() {
    return new Location(this.getCurrentPath(), this.getCurrentState());
  }

  canGo(n) {
    return n === 0;
  }

  canGoBack() {
    return this.canGo(-1);
  }

  canGoForward() {
    return this.canGo(1);
  }

  back() {
    this.go(-1);
  }

  forward() {
    this.go(1);
  }

}

module.exports = History;
