// core/directives/transition-prefrender-dir
// Usage: Singleton
//        <div ng-include="templates.layout" transition-prerender=""></div>
NSfn.namespace('intv.core').directives = intv.core.directives || angular.module('intv.core.directives', []);

intv.core.directives.TransitionPrerender = function ($rootScope,$timeout) {
    return function(scope, element, attrs) {
        console.log("transition prerender directive initialized");
        scope.$on('page-view',function(){
            console.log('page-view caught in transition-prerender directive', $rootScope.properties.search);
        });
    };
};

intv.core.directives.directive('transitionPrerender', ['$rootScope','$timeout', intv.core.directives.TransitionPrerender]);

console.log("transition prerender directive loaded");