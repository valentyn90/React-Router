webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=       Router,Route=$__0.Route,Redirect=$__0.Redirect,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  render:function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "user", params: {userId: "123"}}, "Bob")), 
	          React.createElement("li", null, React.createElement(Link, {to: "user", params: {userId: "abc"}}, "Sally"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var User = React.createClass({displayName: 'User',
	  mixins: [ Router.State ],

	  render:function () {
	    var $__0=    this.getParams(),userId=$__0.userId;
	    return (
	      React.createElement("div", {className: "User"}, 
	        React.createElement("h1", null, "User id: ", userId), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "task", params: {userId: userId, taskId: "foo"}}, "foo task")), 
	          React.createElement("li", null, React.createElement(Link, {to: "task", params: {userId: userId, taskId: "bar"}}, "bar task"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});


	var Task = React.createClass({displayName: 'Task',
	  mixins: [ Router.State ],

	  render:function () {
	    var $__0=     this.getParams(),userId=$__0.userId,taskId=$__0.taskId;
	    return (
	      React.createElement("div", {className: "Task"}, 
	        React.createElement("h2", null, "User id: ", userId), 
	        React.createElement("h3", null, "Task id: ", taskId)
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {path: "/", handler: App}, 
	    React.createElement(Route, {name: "user", path: "/user/:userId", handler: User}, 
	      React.createElement(Route, {name: "task", path: "tasks/:taskId", handler: Task}), 
	      React.createElement(Redirect, {from: "todos/:taskId", to: "task"})
	    )
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'))
	});


/***/ }
]);