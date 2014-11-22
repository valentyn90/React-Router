webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var AsyncElement = {
	  loadedComponent: null,

	  load: function () {
	    if (this.constructor.loadedComponent)
	      return;

	    this.bundle(function (component) {
	      this.constructor.loadedComponent = component;
	      this.forceUpdate();
	    }.bind(this));
	  },

	  componentDidMount: function () {
	    setTimeout(this.load, 1000); // feel it good
	  },

	  render: function () {
	    var component = this.constructor.loadedComponent;
	    if (component) {
	      // can't find RouteHandler in the loaded component, so we just grab
	      // it here first.
	      this.props.activeRoute = React.createElement(RouteHandler, null);
	      return component(this.props);
	    }
	    return this.preRender();
	  }
	};

	var PreDashboard = React.createClass({displayName: 'PreDashboard',
	  mixins: [ AsyncElement ],
	  bundle: __webpack_require__(6),
	  preRender: function () {
	    return React.createElement("div", null, "Loading dashboard...")
	  }
	});

	var PreInbox = React.createClass({displayName: 'PreInbox',
	  mixins: [ AsyncElement ],
	  bundle: __webpack_require__(8),
	  preRender: function () {
	    return React.createElement("div", null, "Loading inbox...")
	  }
	});

	var App = React.createClass({displayName: 'App',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("h1", null, "Partial App"), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement(Link, {to: "dashboard"}, "Dashboard"))
	        ), 
	        React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(Route, {name: "dashboard", path: "dashboard", handler: PreDashboard}, 
	      React.createElement(Route, {name: "inbox", path: "dashboard/inbox", handler: PreInbox})
	    )
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/*nsure*/(11, function(require) {
			cb(__webpack_require__(7));
		});
	}

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/*nsure*/(12, function(require) {
			cb(__webpack_require__(9));
		});
	}

/***/ }

});