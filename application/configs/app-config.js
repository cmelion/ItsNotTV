//Namespace for its-not-tv app
var intv = intv || {external:{},config:{corelibs:{},core:{}}};

// Config the app

// External dependencies live outside our build deploy process, don't concat them
intv.external.dependencies = [];

// Core Libraries
intv.config.corelibs.dependencies = ['core/libs/angular/angular.js',
                                     'core/libs/angular/angular-route.js',
                                     'core/libs/jsonpath.js'];

// Common/Shared dependencies
intv.config.core.dependencies = ['core/controllers/lazy-loader-ctrl.js',
                                 'core/directives/transition-prerender-dir.js'];

// View/Route specific dependencies
intv.config.routeConfigs = {
    default: {
        properties:   { hideHeader : false,
                        isPanorama : true },
        templates:    { layout: 'application/views/panorama/layout.ptl.html' },
        dependencies: ['application/views/panorama/panorama-ctrl.js']

    }
};
