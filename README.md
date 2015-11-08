# Backbone-Reflex

Backbone-Reflex is Backbone.js plugin/extension that aims to improve and accelerate front-end development.

## Background

As stated in the official site "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.". However, Backbone Views are not the most convenient and practical way of rapidly develop dynamic webpages:
* Event handling declaration is labor intensive
* Explicitly update values by re-rendeding the whole view or through model change event handling and updating specific DOM elements with the new values

The objective of Backbone-Reflex is to add an automatic way of updating view templates whenever the model changes, as well as updating the model whenever the view changes, and remove the need to write boilerplate code for updating the DOM, registering callbacks or watching model changes.

## View

Backbone Views were extended in order to support data-binding and automatic event binding in the template HTML.

For example, imagine a view which contains user details. These details can be directly edited and saved on the view.
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
<input name="name" type="text" class="user-details" value="<%- name %>"></input>
<br>
<strong>Age: </strong>
<input name="age" type="text" class="user-details" value="<%- age %>"></input>
<br>
<strong>Address: </strong>
<input name="address" type="text" class="user-details" value="<%- address %>"></input>
<br>
<strong>Country: </strong>
<input name="country" type="text" class="user-details" value="<%- country %>"></input>
<br>
<input id="save" type="button" value="Save">
<span id="msg"></span>
```
**View code**
```javascript
var UserDetailsView = Backbone.View.extend({

    events: {
        // Save button event handling
        'click #save': 'save',
        // Update fields event handling
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
        this.model.set($val.attr('name'), $val.val());
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

Even with a simple view, it required a generous amount of code, most of which is boilerplate and will be repeated on all project views. Furthermore, if we wanted to listen to model changed we would have to register a listener.

In Backbone-Reflex, a ReflexView is an extended version of the regular Backbone.View. However, a ReflexView will support data-binding and event binding on the template itself.

For the same example:

**User details template**
```html
<strong>Name: </strong>
<input reflex-attr="name" type="text"></input>
<br>
<strong>Age: </strong>
<input reflex-attr="age" type="text"></input>
<br>
<strong>Address: </strong>
<input reflex-attr="address" type="text"></input>
<br>
<strong>Country: </strong>
<input reflex-attr="country" type="text"></input>
<br>
<input type="button" value="Save" reflex-ctrl="click,save">
<span id="msg"></span>
```
**View code**
```javascript
var UserDetailsView = Backbone.ReflexView.extend({


    initialize: function (options) {
        _.extend(this, options);
    },

    render: function () {
        var template = _.template(...)();
        this.$el.html(template);
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

```

**reflex-attr** - *reflex-attr="< attribute name >"* - Data-binding of a model attribute name.
Data update is bidirectional, if the user changes the value, the model is updated, and if the model is changed the template changes as well.

**reflex-ctrl** - *reflext-ctrl="< events >,< callback >"* - Register event handling by enumerating the events (e.g. 'click mouseover') seperated by spaces and the view callback method.
