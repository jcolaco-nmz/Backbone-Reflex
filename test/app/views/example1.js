define([
    'backbone',
    'models/example1',
    'text!templates/example1.html'
], function(Backbone, Example1Model, exampleTpl) {
        return Backbone.ReflexView.extend({

            initialize: function () {
                this.model = new Example1Model();
            },

            render: function() {
                this.$el.html(_.template(exampleTpl)());
                this.bindModel();
                this.bindView();
                /*
                 * Or just call this.bindModelAndView();
                 */
                return Backbone.View.prototype.render.call(this);
            }
        });
    });
