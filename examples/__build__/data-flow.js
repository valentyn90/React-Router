webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=      Router,Route=$__0.Route,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',

	  mixins: [ Router.Navigation ],

	  getInitialState: function () {
	    return {
	      tacos: [
	        { name: 'duck confit' },
	        { name: 'carne asada' },
	        { name: 'shrimp' }
	      ]
	    };
	  },

	  addTaco: function () {
	    var name = prompt('taco name?');
	    this.setState({
	      tacos: this.state.tacos.concat({name: name})
	    });
	  },

	  handleRemoveTaco: function (removedTaco) {
	    var tacos = this.state.tacos.filter(function (taco) {
	      return taco.name != removedTaco;
	    });
	    this.setState({tacos: tacos});
	    this.transitionTo('/');
	  },

	  render: function () {
	    var links = this.state.tacos.map(function (taco) {
	      return React.createElement("li", null, React.createElement(Link, {to: "taco", params: taco}, taco.name))
	    });
	    return (
	      React.createElement("div", {className: "App"}, 
	        React.createElement("button", {onClick: this.addTaco}, "Add Taco"), 
	        React.createElement("ul", {className: "Master"}, 
	          links
	        ), 
	        React.createElement("div", {className: "Detail"}, 
	          React.createElement(RouteHandler, {onRemoveTaco: this.handleRemoveTaco})
	        )
	      )
	    );
	  }
	});

	var Taco = React.createClass({displayName: 'Taco',
	  mixins: [ Router.State ],

	  remove: function () {
	    this.props.onRemoveTaco(this.getParams().name);
	  },

	  render: function () {
	    return (
	      React.createElement("div", {className: "Taco"}, 
	        React.createElement("h1", null, this.getParams().name), 
	        React.createElement("button", {onClick: this.remove}, "remove")
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(Route, {name: "taco", path: "taco/:name", handler: Taco})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ }
]);