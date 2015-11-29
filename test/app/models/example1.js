define([
    'backbone'
], function(Backbone) {
        return Backbone.Model.extend({
            defaults: {
                name: 'Foobar',
                age: 25,
                address: '221B Baker Street',
                country: 'Backboneland'
            }
        });
    });
