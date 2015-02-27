var invariant = require('react/lib/invariant');
var History = require('./History');

class DOMHistory extends History {

  get length() {
    var state = this.getCurrentState();
    return state && state.length || 1;
  }

  get current() {
    var state = this.getCurrentState();
    return state && state.current || this.length - 1;
  }

  canGo(n) {
    if (n === 0)
      return true;

    var next = this.current + n;
    return next >= 0 && next < this.length;
  }

  go(n) {
    if (n === 0)
      return;

    invariant(
      this.canGo(n),
      'Cannot go(%s); there is not enough history',
      n
    );

    window.history.go(n);
  }

}

module.exports = DOMHistory;
