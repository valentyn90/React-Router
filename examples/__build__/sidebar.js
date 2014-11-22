webpackJsonp([8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(10);
	var Router = __webpack_require__(1);
	var $__0=       Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute,RouteHandler=$__0.RouteHandler,Link=$__0.Link;
	var data = __webpack_require__(3);

	var CategoryNav = React.createClass({displayName: 'CategoryNav',
	  getInitialState: function () {
	    return { isOpen: this.props.defaultIsOpen};
	  },

	  getDefaultProps: function () {
	    return { isOpen: false };
	  },

	  componentWillReceiveProps: function (newProps) {
	    if (!this.state.isOpen)
	      this.setState({ isOpen: newProps.defaultIsOpen });
	  },

	  toggle: function () {
	    this.setState({ isOpen: !this.state.isOpen });
	  },

	  buildToggleClassName: function () {
	    var toggleClassName = 'CategoryNav__Toggle';
	    if (this.state.isOpen)
	      toggleClassName += ' CategoryNav__Toggle--is-open';
	    return toggleClassName;
	  },

	  renderItems: function () {
	    var category = this.props.category;
	    return this.state.isOpen ? category.items.map(function (item) {
	      var params = { name: item.name, category: category.name };
	      return (
	        React.createElement("li", {key: item.name}, 
	          React.createElement(Link, {to: "item", params: params}, item.name)
	        )
	      );
	    }) : null;
	  },

	  render: function () {
	    var category = this.props.category;
	    return (
	      React.createElement("div", {className: "CategoryNav"}, 
	        React.createElement("h3", {
	          className: this.buildToggleClassName(), 
	          onClick: this.toggle
	        }, category.name), 
	        React.createElement("ul", null, this.renderItems())
	      )
	    );
	  }
	});

	var Sidebar = React.createClass({displayName: 'Sidebar',
	  renderCategory: function (category) {
	    return React.createElement(CategoryNav, {
	      key: category.name, 
	      defaultIsOpen: category.name === this.props.activeCategory, 
	      category: category}
	    );
	  },

	  render: function () {
	    return (
	      React.createElement("div", {className: "Sidebar"}, 
	        this.props.categories.map(this.renderCategory)
	      )
	    );
	  }
	});

	var App = React.createClass({displayName: 'App',
	  mixins: [ Router.State ],

	  render: function () {
	    var activeCategory = this.getParams().category;
	    return (
	      React.createElement("div", null, 
	        React.createElement(Sidebar, {activeCategory: activeCategory, categories: data.getAll()}), 
	        React.createElement("div", {className: "Content"}, 
	          React.createElement(RouteHandler, null)
	        )
	      )
	    );
	  }
	});

	var Item = React.createClass({displayName: 'Item',
	  mixins: [ Router.State ],

	  render: function () {
	    var params = this.getParams();
	    var category = data.lookupCategory(params.category);
	    var item = data.lookupItem(params.category, params.name);
	    return (
	      React.createElement("div", null, 
	        React.createElement("h2", null, category.name, " / ", item.name), 
	        React.createElement("p", null, "Price: $", item.price)
	      )
	    );
	  }
	});

	var Index = React.createClass({displayName: 'Index',
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("p", null, "Sidebar features:"), 
	        React.createElement("ul", {style: {maxWidth: '400px'}}, 
	          React.createElement("li", null, "User can open/close categories"), 
	          React.createElement("li", null, 
	            "Visiting an item on first page load will automatically open" + ' ' +
	            "the correct category. (Click an item, then reload the" + ' ' +
	            "browser.)"
	          ), 
	          React.createElement("li", null, 
	            "Navigating with forward/back buttons will open an active" + ' ' +
	            "category if it is not already open. (Navigate to several" + ' ' +
	            "items, close all the categories, then use back/forward" + ' ' +
	            "buttons.)"
	          ), 
	          React.createElement("li", null, 
	            "Only the user can close a category. (Navigating from an" + ' ' +
	            "active category will not close it.)"
	          )
	        )
	      )
	    );
	  }
	});

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(DefaultRoute, {handler: Index}), 
	    React.createElement(Route, {name: "item", path: ":category/:name", handler: Item})
	  )
	);

	Router.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('example'));
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var data = [
	  {
	    name: 'Tacos',
	    items: [
	      { name: 'Carne Asada', price: 7 },
	      { name: 'Pollo', price: 6 },
	      { name: 'Carnitas', price: 6 }
	    ]
	  },
	  {
	    name: 'Burgers',
	    items: [
	      { name: 'Buffalo Bleu', price: 8 },
	      { name: 'Bacon', price: 8 },
	      { name: 'Mushroom and Swiss', price: 6 }
	    ]
	  },
	  {
	    name: 'Drinks',
	    items: [
	      { name: 'Lemonade', price: 3 },
	      { name: 'Root Beer', price: 4 },
	      { name: 'Iron Port', price: 5 }
	    ]
	  }
	];

	var dataMap = data.reduce(function (map, category) {
	  category.itemsMap = category.items.reduce(function (itemsMap, item) {
	    itemsMap[item.name] = item;
	    return itemsMap;
	  }, {});
	  map[category.name] = category;
	  return map;
	}, {});

	exports.getAll = function () {
	  return data;
	};

	exports.lookupCategory = function (name) {
	  return dataMap[name];
	};

	exports.lookupItem = function (category, item) {
	  return dataMap[category].itemsMap[item];
	};



/***/ }
]);