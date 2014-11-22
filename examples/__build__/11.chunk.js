webpackJsonp([11],{

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=     Router,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var Dashboard = React.createClass({displayName: 'Dashboard',

	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("h1", null, "Dashboard!"), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "inbox"}, "Inbox"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	module.exports = Dashboard;


/***/ }

});