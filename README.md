# Backbone-Reflex

Backbone-Reflex is Backbone.js plugin/extension that aims to improve and accelerate front-end development.

## Background

As stated in the official site "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.". However, Backbone Views are not the most convenient and practical way of rapidly develop dynamic webpages:
    - Event handling declaration is labor intensive
    - Explicitly update values by re-rendeding the whole view or through model change event handling and updating specific DOM elements with the new values

The objective of Backbone-Reflex is to add an automatic way of updating view templates whenever the model changes, as well as updating the model whenever the view changes, and remove the need to write boilerplate code for updating the DOM, registering callbacks or watching model changes.

## ViewController

A new entity called ViewController is added to Backbone. A ViewController is a Backbone View on steroids that supports data-binding and direct controller access on its templates.
With regular Backbone, a Model is created, then passed to a View, which registers events and renders a HTML template:

**Model code**
```javascript
var UserModel = Backbone.Model.extend({
    urlRoot: '/user',
});

var user =  new UserModel({
    name: 'John',
    age: 25,
    address: 'Foobar street',
    country: 'Foobarland'
});
```
**Simple editable user details template**
```html
<strong>Name: </strong>
<span name="name" class="user-details"><%- name %></span>
<br>
<strong>Age: </strong>
<span name="age" class="user-details"><%- age %></span>
<br>
<strong>Address: </strong>
<span name="address" class="user-details"><%- address %></span>
<br>
<strong>Country: </strong>
<span name="country" class="user-details"><%- country %></span>
<br>
<input id="save" type="button" value="Save">
<span id="msg"></span>
```
**View code**
```javascript
var UserDetailsView = Backbone.View.extend({

    events: {
        'click #save': 'save',
        'keyup .user-details': 'updateModel'
    },

    initialize: function (options) {
        _.extend(this, options);
    },

    render: function () {
        var template = _.template(...)(this.model.attributes);
        this.$el.html(template);
    },

    updateModel: function (evt) {
        var $val = $(evt.currentTarget);
        this.model.set($val.attr('name'), $val.text());
    },

    // Saves model. Adds success/error message, with specific css styling
    save: function () {
        this.model.save().done(function () {
            var $selector = this.$el.find('#msg');
            $selector.text('Saved!');
            $selector.removeClass('error');
            $selector.addClass('success');
        }.bind(this))
        .error(function () {
            this.$el.find('#msg').text('Error while saving');
            $selector.removeClass('success');
            $selector.addClass('error');
        }.bind(this));
    }

});

var userDetails = new UserDetailsView({model: user});

$('#user-section').html(userDetails.el);

userDetails.render();

```

Even with a simple view, it required a generous amount of code, Most of which is boilerplate and will be repeated on all project views.

// TO BE CONTINUED...
