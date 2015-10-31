(function(root, factory) {
    // Set up Backbone-reflex for the environment.
	// AMD.
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'backbone', 'underscore'], factory);
	}
	// Node.js or CommonJS.
	else if (typeof exports !== 'undefined') {
		factory(exports, require('backbone'), require('underscore'));
	}
	// 'root' references to 'window'
	else {
		factory(root, root.Backbone, root._);
	}
}(this, function(exports, Backbone, _) {
	"use strict";

}));
