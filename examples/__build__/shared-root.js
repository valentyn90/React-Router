webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("ol", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "home"}, "Home")), 
	          React.createElement("li", null, React.createElement(Link, {to: "signin"}, "Sign in")), 
	          React.createElement("li", null, React.createElement(Link, {to: "forgot-password"}, "Forgot Password"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var SignedIn = React.createClass({displayName: 'SignedIn',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("h2", null, "Signed In"), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var Home = React.createClass({displayName: 'Home',
	  render: function () {
	    return (
	      React.createElement("h3", null, "Welcome home!")
	    );
	  }
	});

	var SignedOut = React.createClass({displayName: 'SignedOut',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("h2", null, "Signed Out"), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var SignIn = React.createClass({displayName: 'SignIn',
	  render: function () {
	    return (
	      React.createElement("h3", null, "Please sign in.")
	    );
	  }
	});

	var ForgotPassword = React.createClass({displayName: 'ForgotPassword',
	  render: function () {
	    return (
	      React.createElement("h3", null, "Forgot your password?")
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(Route, {handler: SignedOut}, 
	      React.createElement(Route, {name: "signin", handler: SignIn}), 
	      React.createElement(Route, {name: "forgot-password", handler: ForgotPassword})
	    ), 
	    React.createElement(Route, {handler: SignedIn}, 
	      React.createElement(Route, {name: "home", handler: Home})
	    )
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ }
]);