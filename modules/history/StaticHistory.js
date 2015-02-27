var invariant = require('react/lib/invariant');
var History = require('./History');

function throwCannotModify() {
  invariant(false, 'StaticHistory cannot be modified');
}

/**
 * A history implementation that is convenient for stateless
 * server environments where the URL is given once. Allows you
 * to specify the path and state at creation time.
 */
class StaticHistory extends History {

  constructor(path, state=null) {
    this.path = path;
    this.state = state;
  }

  get length() {
    return 1;
  }

  go(n) {
    if (n === 0)
      return;

    invariant(
      false,
      'StaticHistory cannot go(%s); it cannot be modified',
      n
    );
  }

  getCurrentPath() {
    return this.path;
  }

  getCurrentState() {
    return this.state;
  }

}

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

StaticHistory.prototype.pushState = throwCannotModify;
StaticHistory.prototype.replaceState = throwCannotModify;

module.exports = StaticHistory;
