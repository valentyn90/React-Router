webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "user", params: {userID: "123"}}, "Bob")), 
	          React.createElement("li", null, React.createElement(Link, {to: "user", params: {userID: "123"}, query: {showAge: true}}, "Bob With Query Params")), 
	          React.createElement("li", null, React.createElement(Link, {to: "user", params: {userID: "abc"}}, "Sally"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var User = React.createClass({displayName: 'User',
	  mixins: [ Router.State ],

	  render: function () {
	    var age = this.getQuery().showAge ? '33' : '';
	    var userID = this.getParams().userID;
	    return (
	      React.createElement("div", {className: "User"}, 
	        React.createElement("h1", null, "User id: ", userID), 
	        age
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(Route, {name: "user", path: "user/:userID", handler: User})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ }
]);