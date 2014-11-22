webpackJsonp([6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=       Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "dashboard"}, "Dashboard")), 
	          React.createElement("li", null, React.createElement(Link, {to: "form"}, "Form"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var Home = React.createClass({displayName: 'Home',
	  render: function () {
	    return React.createElement("h1", null, "Home");
	  }
	});

	var Dashboard = React.createClass({displayName: 'Dashboard',
	  render: function () {
	    return React.createElement("h1", null, "Dashboard")
	  }
	});

	var Form = React.createClass({displayName: 'Form',

	  mixins: [ Router.Navigation ],

	  statics: {
	    willTransitionFrom: function (transition, element) {
	      if (element.refs.userInput.getDOMNode().value !== '') {
	        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
	          transition.abort();
	        }
	      }
	    }
	  },

	  handleSubmit: function (event) {
	    event.preventDefault();
	    this.refs.userInput.getDOMNode().value = '';
	    this.transitionTo('/');
	  },

	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("form", {onSubmit: this.handleSubmit}, 
	          React.createElement("p", null, "Click the dashboard link with text in the input."), 
	          React.createElement("input", {type: "text", ref: "userInput", defaultValue: "ohai"}), 
	          React.createElement("button", {type: "submit"}, "Go")
	        )
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(DefaultRoute, {handler: Home}), 
	    React.createElement(Route, {name: "dashboard", handler: Dashboard}), 
	    React.createElement(Route, {name: "form", handler: Form})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ }
]);