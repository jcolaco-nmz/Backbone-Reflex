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

	Backbone.ReflexView = Backbone.View.extend({


		bindModel: function () {
			if (this.model) {
				this._updateEventHash();
				this.listenTo(this.model, 'change', this._updateTemplateValues);
			}
		},

		unbindModel: function () {
			if (this.model) {
				this.stopListening(this.model);
				this._updateEventHash();
			}
		},

		bindView: function () {

		},

		unbindView: function () {

		},

		bindModelAndView: function () {
			this.bindModel();
			this.bindView();
		},

		unbindModelAndView: function () {
			this.unbindModel();
			this.unbindView();
		},

		_updateEventHash: function () {
			var $selectors = this.$el.find('[data-attr]'),
				events = {};

			$selectors.each(function (index, obj) {
				var $obj = $(obj),
					attribute = $obj.attr('data-attr'),
					eventType = this._getEventType($obj),
					identifier;

				identifier = attribute + '-' + this.model.cid;
				$obj.attr('data-attr', identifier);
				events[eventType + ' [data-attr=' + identifier + ']'] = '_updateModelValues';

			}.bind(this));
			if (!this.events) {
				this.events = {};
			}
			_.extend(this.events, events);
			this.delegateEvents();
		},

		_getEventType: function ($selector) {
			if ($selector.is('input')) {
				//var type = $selector.attr('type');
				return 'keyup';
			} else if ($selector.is('textarea')) {
				return 'keyup';
			} else {
				return 'change';
			}
		},

		_updateTemplateValues: function () {
			var $selectors = this.$el.find('[data-attr]');

			$selectors.each(function (index, obj) {
				var $obj = $(obj),
					attribute = $obj.attr('data-attr'),
					str = dataAttr.split('-'),
					modelCid = str.pop(),
					attribute = str.join();

				if (modelCid === model.cid) {
					this._setValue($obj, attribute);
				}
			}.bind(this));
		},

		_updateModelValues: function (evt) {
			var $target = $(evt.currentTarget),
				dataAttr = $target.attr('data-attr'),
				str = dataAttr.split('-'),
				modelCid = str.pop(),
				attribute = str.join();

			if (this.model.cid === modelCid) {
				this.stopListening(this.model);
				this.model.set(attribute, this._getValue($target));
				this.listenTo('change', this.model, this._updateTemplateValues);
			}
		},

		_getValue: function ($target) {
			return $target.val();
		},

		_setValue: function ($target, attribute) {
			$target.val(this.model.get(attribute));
		}

	});

}));
