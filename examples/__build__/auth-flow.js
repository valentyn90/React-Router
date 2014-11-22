webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  getInitialState: function () {
	    return {
	      loggedIn: auth.loggedIn()
	    };
	  },

	  setStateOnAuth: function (loggedIn) {
	    this.setState({
	      loggedIn: loggedIn
	    });
	  },

	  componentWillMount: function () {
	    auth.onChange = this.setStateOnAuth;
	    auth.login();
	  },

	  render: function () {
	    var loginOrOut = this.state.loggedIn ?
	      React.createElement(Link, {to: "logout"}, "Log out") :
	      React.createElement(Link, {to: "login"}, "Sign in");
	    return (
	      React.createElement("div", null, 
	        React.createElement("ul", null, 
	          React.createElement("li", null, loginOrOut), 
	          React.createElement("li", null, React.createElement(Link, {to: "about"}, "About")), 
	          React.createElement("li", null, React.createElement(Link, {to: "dashboard"}, "Dashboard"), " (authenticated)")
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var Authentication = {
	  statics: {
	    willTransitionTo: function (transition) {
	      if (!auth.loggedIn()) {
	        Login.attemptedTransition = transition;
	        transition.redirect('/login');
	      }
	    }
	  }
	};

	var Dashboard = React.createClass({displayName: 'Dashboard',
	  mixins: [ Authentication ],

	  render: function () {
	    var token = auth.getToken();
	    return (
	      React.createElement("div", null, 
	        React.createElement("h1", null, "Dashboard"), 
	        React.createElement("p", null, "You made it!"), 
	        React.createElement("p", null, token)
	      )
	    );
	  }
	});

	var Login = React.createClass({displayName: 'Login',
	  mixins: [ Router.Navigation ],

	  statics: {
	    attemptedTransition: null
	  },

	  getInitialState: function () {
	    return {
	      error: false
	    };
	  },

	  handleSubmit: function (event) {
	    event.preventDefault();
	    var email = this.refs.email.getDOMNode().value;
	    var pass = this.refs.pass.getDOMNode().value;
	    auth.login(email, pass, function (loggedIn) {
	      if (!loggedIn)
	        return this.setState({ error: true });

	      if (Login.attemptedTransition) {
	        var transition = Login.attemptedTransition;
	        Login.attemptedTransition = null;
	        transition.retry();
	      } else {
	        this.replaceWith('/about');
	      }
	    }.bind(this));
	  },

	  render: function () {
	    var errors = this.state.error ? React.createElement("p", null, "Bad login information") : '';
	    return (
	      React.createElement("form", {onSubmit: this.handleSubmit}, 
	        React.createElement("label", null, React.createElement("input", {ref: "email", placeholder: "email", defaultValue: "joe@example.com"})), 
	        React.createElement("label", null, React.createElement("input", {ref: "pass", placeholder: "password"})), " (hint: password1)", React.createElement("br", null), 
	        React.createElement("button", {type: "submit"}, "login"), 
	        errors
	      )
	    );
	  }
	});

	var About = React.createClass({displayName: 'About',
	  render: function () {
	    return React.createElement("h1", null, "About");
	  }
	});

	var Logout = React.createClass({displayName: 'Logout',
	  componentDidMount: function () {
	    auth.logout();
	  },

	  render: function () {
	    return React.createElement("p", null, "You are now logged out");
	  }
	});


	// Fake authentication lib

	var auth = {
	  login: function (email, pass, cb) {
	    var cb = arguments[arguments.length - 1];
	    if (localStorage.token) {
	      cb && cb(true);
	      this.onChange(true);
	      return;
	    }
	    pretendRequest(email, pass, function (res) {
	      if (res.authenticated) {
	        localStorage.token = res.token;
	        cb && cb(true);
	        this.onChange(true);
	      } else {
	        cb && cb(false);
	        this.onChange(false);
	      }
	    }.bind(this));
	  },

	  getToken: function () {
	    return localStorage.token;
	  },

	  logout: function (cb) {
	    delete localStorage.token;
	    cb && cb();
	    this.onChange(false);
	  },

	  loggedIn: function () {
	    return !!localStorage.token;
	  },

	  onChange: function () {}
	};

	function pretendRequest(email, pass, cb) {
	  setTimeout(function () {
	    if (email === 'joe@example.com' && pass === 'password1') {
	      cb({
	        authenticated: true,
	        token: Math.random().toString(36).substring(7),
	      });
	    } else {
	      cb({authenticated: false});
	    }
	  }, 0);
	}

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(Route, {name: "login", handler: Login}), 
	    React.createElement(Route, {name: "logout", handler: Logout}), 
	    React.createElement(Route, {name: "about", handler: About}), 
	    React.createElement(Route, {name: "dashboard", handler: Dashboard})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ }
]);