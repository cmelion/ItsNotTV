// core/controlers/lazy-loader-ctrl
// Usage: as module ng-controller="LazyLoader", as POJO ng-controller="intv.core.controllers.LazyLoader"
NSfn.namespace('intv.core').controllers = intv.core.controllers || angular.module('intv.core.controllers', ['ngRoute']);

intv.core.controllers.LazyLoader = function ($rootScope,$route,$timeout,$location) {
    var routeChangeCount = 0;
    $rootScope.$on('$routeChangeStart', function(scope, newRoute){
        $rootScope.properties = $rootScope.properties?$rootScope.properties:{};
        //Address possible memory leaks without excessive impact on performance
        //TODO:  use a constant for maxrouteChangeCount

        $rootScope.errorModelLoaded = false;
        var maxRouteChangeCount = 20,
            overrideReload  =  (newRoute.properties) ? newRoute.properties.overrideReload : false;

        if (routeChangeCount++ > maxRouteChangeCount && !overrideReload) window.location.reload();

        console.log("routeChangeStarts triggered", +new Date());


        //Warm http cache
        /*        data.load({url: '/data/browserCompatibility.json',
         resultHandler: function(){return false},
         faultHandler: function(){return false}});
         var targetURL = hbo.lte.constants.DATA_SERVER + $location.$$path + '/data.json';

         //TODO: Panorama does not do lazy load of images when cache is warmed need to find root cause
         if (targetURL != (hbo.lte.constants.DATA_SERVER + '/' + '/data.json')) {
         data.load({url: targetURL, faultHandler: function(){return false}});
         }
         */

        var $rt = newRoute.templates?newRoute:newRoute.$route;
        if (!$rt) {
            //Load the error template, use timeout to avoid calling $digest
            //TODO: put error partial path into a constant
            //TODO: this template should be injected
            $timeout(function(){$rootScope.templates =  { layout: 'application/views/error/partials/error.ptl.html'};},0);
            console.log('The 404/error template loaded via the otherwise routeProvider.');
            return;
        }

        //TODO:  Do we always know a redirecto is using the same route handler as the previous route?
        // Next / Previous navigation links in program vertical page
        if ($rt && ($rt.redirectTo || ($rt.templates === scope.currentScope.templates))) {
            //Let current controller handle route change
            console.log("reusing previous template on route change, " + $rt.loaded);

            //Ensure we are at the top of the page, giving page enough time to render
            //$timeout(function(){window.scrollTo( 0, 0 )},300, false);
            return;
        }

        //Save some useful state information in the rootscope
        $rootScope.previousProperties = $rootScope.properties || {};
        $rootScope.properties =  $rt.properties?$rt.properties:$rootScope.properties;
        $rootScope.properties.location = $location.path();
        $rootScope.properties.search = $location.$$search;
        console.log('route properties set to scope :' , $rootScope.properties);
        $rt.dependencies = $rt.dependencies?$rt.dependencies:false;

        //Load dependencies then set template in oncomplete method
        Modernizr.load({
            test: ($rt.loaded === true)||(!$rt.dependencies),
            nope: $rt.dependencies,
            complete: function () {
                $rt.loaded = true;

                //Use timeout to avoid calling $digest and give scripts time to parse
                $timeout(function(){
                    $rootScope.templates = $rt.templates;
                    console.log('template set for:',$rt.templates, +new Date());
                    //Ensure we are at the top of the page
                    //$timeout(function(){window.scrollTo( 0, 0 )}, 100);
                },0);

                $timeout(function(){
                    $rootScope.$broadcast('page-view');
                },200, false);
            }
        });

    });
};

intv.core.controllers.controller('LazyLoader', ['$rootScope','$route','$timeout','$location', intv.core.controllers.LazyLoader]);

console.log("lazy load controller loaded");