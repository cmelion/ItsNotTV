// core/directives/transition-prefrender-dir
// Usage: Singleton
//        <div ng-include="templates.layout" transition-prerender=""></div>
NSfn.namespace('intv.core').directives = intv.core.directives || angular.module('intv.core.directives', []);

intv.removeAttrs = function(elems, attr){
    if ( elems) {
        var i =  elems.length;
        while(i--) {
            elems[i].removeAttribute(attr);
            elems[i].setAttribute("ng-non-bindable","");
        }
    }
};

intv.core.directives.TransitionPrerender = function ($rootScope, $timeout) {

    var handlePrerenderTransition = function handlePrerenderTransition (scope, element, attrs) {
        console.log("transition prerender directive initialized");
        scope.$on('page-view',function(){
            var cloneElement,
                $clone,
                $el = element[0],
                search = $rootScope.properties.search;

            if  (search && search.stage !== 'prerender'){
                $clone = document.getElementById('remove-me');
                if ($clone) {
                    cloneElement = angular.element(cloneElement);
                    //Cross-fade
                    cloneElement.removeClass('fade-in').addClass('fade-out');
                    element.removeClass('fade-out').addClass('fade-in');
                    //Remove pre-render
                    $timeout(function(){$clone.parentNode.removeChild($clone)}, 1000);
                }
            } else {

                //Get a shallow copy of the node
                $clone = $el.cloneNode(false);
                //Prepare pre-rendered node for x-fade/removal
                $el.id = "remove-me";
                cloneElement = angular.element($clone);
                //Strip out angular directives from the element and it's children and make sure no binding is attempted
                intv.removeAttrs([$el],"ng-controller");
                intv.removeAttrs([$el],"ng-include");

                //Remove classes added by compile phase
                element.removeClass('ng-scope').addClass('fade-in');
                cloneElement.removeClass('ng-scope').addClass('fade-out');

                intv.removeAttrs([$el],"transition-prerender");

                //Strip attributes from the child nodes
                intv.removeAttrs($el.querySelectorAll(".parallax-container"),"hbo-panorama");
                intv.removeAttrs($el.querySelectorAll("*[ng-controller]"),"ng-controller");
                intv.removeAttrs($el.querySelectorAll("*[ng-repeat]"),"ng-repeat");
                intv.removeAttrs($el.querySelectorAll("*[ng-include]"),"ng-include");
                intv.removeAttrs($el.querySelectorAll("ng-include"),"src");
                intv.removeAttrs($el.querySelectorAll("*[ng-href]"),"ng-href");

                //Remove ng-scope class for good measure
                element.children().removeClass('ng-scope');

                //Add the ng-include div back in
                $el.parentNode.insertBefore($clone, $el.nextSibling);

                console.log("stage=prerender", element, attrs);
            }
            console.log('page-view caught in transition-prerender directive', $rootScope.properties.search);
        });
    };

    return handlePrerenderTransition;
};

intv.core.directives.directive('transitionPrerender', ['$rootScope','$timeout', intv.core.directives.TransitionPrerender]);

console.log("transition prerender directive loaded");