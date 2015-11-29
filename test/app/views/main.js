define([
    'backbone',
    'views/example1',
    'text!templates/main.html'
], function(Backbone, Example1View, mainTpl) {
        return Backbone.View.extend({
            events: {
                'click #example1': 'loadExample1'
            },

            render: function() {
                this.$el.html(_.template(mainTpl)());
                return Backbone.View.prototype.render.call(this);
            },

            loadExample1: function () {
                var $exampleContainer = this.$el.find('#example-container'),
                    view = new Example1View();

                $exampleContainer.html(view.el);
                view.render();
            }
        });
    });
