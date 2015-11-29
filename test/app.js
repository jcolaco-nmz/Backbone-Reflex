requirejs.config({
    baseUrl: 'app',
    paths: {
        text: '../lib/require/text',
        jquery: '../lib/jquery-1.9.1',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',
        'backbone-reflex': '../backbone-reflex'
    }
});

require([
    'views/main',
    'underscore',
    'backbone',
    'backbone-reflex'
],
    function(MainView) {
        var mainView = new MainView();
        $('#container').html(mainView.el);
        mainView.render();
    });
