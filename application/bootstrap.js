// /bootstrap.js

console.log('executing bootstrap.js', +new Date());

//Namespace for its-not-tv app
var intv = intv || {};

intv.instrumentation = {};
intv.instrumentation.timings = {};

// Set some instrumentation values
intv.instrumentation.timings.bootstrap = +new Date();
console.log('application bootstrap starting', intv.instrumentation.timings.bootstrap);



intv.config.complete = function complete() {
    intv.app = angular.module('intv.app',
                              ['intv.core.controllers',
                               'intv.core.directives']).value('$anchorScroll', angular.noop);;

    intv.app.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            'use strict';
            $locationProvider.html5Mode(true);

            // Setup Application Routes
            $routeProvider.when('/test/:yearID/:monthID/', intv.config.routeConfigs.default);
            $routeProvider.otherwise(intv.config.routeConfigs.default);
        }
    ]);

    console.log('angular bootstrap starting', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));
    angular.bootstrap(document.body, ['intv.app']);
    console.log('angular bootstrap complete', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));
};
console.log(intv.config);


//Load core libs/dependencies and any required external dependencies before bootstrapping the app
Modernizr.load({
    load: intv.config.corelibs.dependencies.concat(intv.config.core.dependencies).concat(intv.external.dependencies),
    complete: intv.config.complete
});

console.log("bootstrap.js loaded");