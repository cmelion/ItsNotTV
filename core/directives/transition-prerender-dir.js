// core/directives/transition-prefrender-dir
// Usage: Singleton
//        <div ng-include="templates.layout" transition-prerender=""></div>
NSfn.namespace('intv.core').directives = intv.core.directives || angular.module('intv.core.directives', []);

//TODO: Move removeAttrs function into a service and inject it
intv.core.removeAttrs = function(elems, attr){
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
                    //Absolute positioned element has been taken out of the flow,
                    //    we have to set a width because we want to use the same
                    //    prerender on all devices without rewriting the DOM
                    $el.style.width = window.innerWidth + "px";
                    console.log('set width to: ', $el ,window.innerWidth);
                    //Cross-fade
                    $el.style.opacity=1;
                    $clone.style.opacity = 0;

                    //Remove pre-render
                    $timeout(function(){
                            $clone.parentNode.removeChild($clone);
                            element.removeClass('fade-out');
                            //Remove absolute positioning and temporary width
                            $timeout(function(){
                                $el.style.width = null;
                            }, 100, false);
                    }, 500, false);
                }
            } else {
                //Get a shallow copy of the node
                $clone = $el.cloneNode(false);

                //Strip out angular directives from the element and it's children and make sure no binding is attempted
                intv.core.removeAttrs([$el],"ng-controller");
                intv.core.removeAttrs([$el],"ng-include");

                intv.core.removeAttrs([$el],"transition-prerender");

                //Strip attributes from the child nodes
                intv.core.removeAttrs($el.querySelectorAll(".parallax-container"),"hbo-panorama");
                intv.core.removeAttrs($el.querySelectorAll("*[ng-controller]"),"ng-controller");
                intv.core.removeAttrs($el.querySelectorAll("*[ng-repeat]"),"ng-repeat");
                intv.core.removeAttrs($el.querySelectorAll("*[ng-include]"),"ng-include");
                intv.core.removeAttrs($el.querySelectorAll("ng-include"),"src");
                intv.core.removeAttrs($el.querySelectorAll("*[ng-href]"),"ng-href");
                intv.core.removeAttrs($el.querySelectorAll("*[ng-style]"),"ng-style");

                //Remove ng-scope class for good measure
                element.children().removeClass('ng-scope');


                //Prepare pre-rendered node for x-fade/removal
                $el.id = "remove-me";
                cloneElement = angular.element($clone);

                //Remove classes added by compile phase
                element.addClass('fade-in');
                cloneElement.addClass('fade-out');

                //Add the ng-include div back in
                $el.parentNode.insertBefore($clone, $el.nextSibling);

                //Remove script tags from document, supports pre-render
                var scripts = document.querySelectorAll("script:not([type])"),
                    i = scripts.length;
                while (i--) {
                    var node = scripts[i];
                    node.parentNode.removeChild( node );
                }
                console.log('script tag(s) removed:',$rt.dependencies, +new Date());

                console.log("stage=prerender", element, attrs);
            }
            console.log('page-view caught in transition-prerender directive', $rootScope.properties.search);
        });
    };

    return handlePrerenderTransition;
};

intv.core.directives.directive('transitionPrerender', ['$rootScope','$timeout', intv.core.directives.TransitionPrerender]);

console.log("transition prerender directive loaded");