webpackJsonp([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=       Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute,RouteHandler=$__0.RouteHandler,Link=$__0.Link;

	var App = React.createClass({displayName: 'App',
	  getInitialState: function () {
	    return { states: findStates() }
	  },

	  render: function () {
	    var links = this.state.states.map(function (state) {
	      return (
	        React.createElement("li", {key: state.abbr}, 
	          React.createElement(Link, {
	            to: "state", 
	            params: { abbr: state.abbr}
	          }, state.name)
	        )
	      );
	    });
	    return (
	      React.createElement("div", {className: "App"}, 
	        React.createElement("ul", {className: "Master"}, 
	          links
	        ), 
	        React.createElement("div", {className: "Detail"}, 
	          React.createElement(RouteHandler, null)
	        )
	      )
	    );
	  }
	});

	var Index = React.createClass({displayName: 'Index',
	  render: function () {
	    return React.createElement("p", null, "Select a state from the left");
	  }
	});

	var State = React.createClass({displayName: 'State',
	  mixins: [ Router.State ],

	  imageUrl: function (name) {
	    return "http://www.50states.com/maps/" + underscore(name) + ".gif";
	  },

	  render: function () {
	    var unitedState = findState(this.getParams().abbr);
	    return (
	      React.createElement("div", {className: "State"}, 
	        React.createElement("h1", null, unitedState.name), 
	        React.createElement("img", {src: this.imageUrl(unitedState.name)})
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(DefaultRoute, {handler: Index}), 
	    React.createElement(Route, {name: "state", path: "state/:abbr", handler: State})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});

	/*****************************************************************************/
	// data stuff

	function findState(abbr) {
	  var states = findStates();
	  for (var i = 0, l = states.length; i < l; i ++) {
	    if (states[i].abbr === abbr) {
	      return states[i];
	    }
	  }
	}

	function findStates() {
	  return [
	    { abbr: "AL", name: "Alabama"},
	    { abbr: "AK", name: "Alaska"},
	    { abbr: "AZ", name: "Arizona"},
	    { abbr: "AR", name: "Arkansas"},
	    { abbr: "CA", name: "California"},
	    { abbr: "CO", name: "Colorado"},
	    { abbr: "CT", name: "Connecticut"},
	    { abbr: "DE", name: "Delaware"},
	    { abbr: "FL", name: "Florida"},
	    { abbr: "GA", name: "Georgia"},
	    { abbr: "HI", name: "Hawaii"},
	    { abbr: "ID", name: "Idaho"},
	    { abbr: "IL", name: "Illinois"},
	    { abbr: "IN", name: "Indiana"},
	    { abbr: "IA", name: "Iowa"},
	    { abbr: "KS", name: "Kansas"},
	    { abbr: "KY", name: "Kentucky"},
	    { abbr: "LA", name: "Louisiana"},
	    { abbr: "ME", name: "Maine"},
	    { abbr: "MD", name: "Maryland"},
	    { abbr: "MA", name: "Massachusetts"},
	    { abbr: "MI", name: "Michigan"},
	    { abbr: "MN", name: "Minnesota"},
	    { abbr: "MS", name: "Mississippi"},
	    { abbr: "MO", name: "Missouri"},
	    { abbr: "MT", name: "Montana"},
	    { abbr: "NE", name: "Nebraska"},
	    { abbr: "NV", name: "Nevada"},
	    { abbr: "NH", name: "New Hampshire"},
	    { abbr: "NJ", name: "New Jersey"},
	    { abbr: "NM", name: "New Mexico"},
	    { abbr: "NY", name: "New York"},
	    { abbr: "NC", name: "North Carolina"},
	    { abbr: "ND", name: "North Dakota"},
	    { abbr: "OH", name: "Ohio"},
	    { abbr: "OK", name: "Oklahoma"},
	    { abbr: "OR", name: "Oregon"},
	    { abbr: "PA", name: "Pennsylvania"},
	    { abbr: "RI", name: "Rhode Island"},
	    { abbr: "SC", name: "South Carolina"},
	    { abbr: "SD", name: "South Dakota"},
	    { abbr: "TN", name: "Tennessee"},
	    { abbr: "TX", name: "Texas"},
	    { abbr: "UT", name: "Utah"},
	    { abbr: "VT", name: "Vermont"},
	    { abbr: "VA", name: "Virginia"},
	    { abbr: "WA", name: "Washington"},
	    { abbr: "WV", name: "West Virginia"},
	    { abbr: "WI", name: "Wisconsin"},
	    { abbr: "WY", name: "Wyoming"}
	  ];
	}

	function underscore(str) {
	  return str.toLowerCase().replace(/ /, '_');
	}


/***/ }
]);