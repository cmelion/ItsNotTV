// core/controlers/css-background-styles-ctrl
// Usage: as module ng-controller="cssBackgroundStylesController", as POJO ng-controller="intv.core.controllers.cssBackgroundStylesController"
NSfn.namespace('intv.core').controllers = intv.core.controllers || angular.module('intv.core.controllers', []);

//TODO Move cssBackgroundStyles method into a service and inject it
intv.core.cssBackgroundStyles = function cssBackgroundStyles (model, selector) {
    if ($scope.backgroundImage !== model.backgroundImage) {
        $scope.backgroundImage = model.backgroundImage;

        $scope.styleStr =
            selector + ' { background-image: url(' + $scope.backgroundImage[$scope.lres] + ');}' +

                '@media only screen and (min-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {' +
                selector + ' {background-image: url(' + $scope.backgroundImage[$scope.hres] + ');}}' +

                '@media only screen and (max-width: 767px), only screen and (orientation: landscape) and (max-device-width: 1024px) and (max-device-height: 767px) {' +
                selector + ' {background-image: url(' + $scope.backgroundImage[$scope.phoneLres]+ ');}}' +

                '@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {' +
                selector + ' {background-image: url(' + $scope.backgroundImage[$scope.phoneHres] + ');}}';

        console.log("setting cssBackgroundStyles");
    }
    return $scope.styleStr;
};

intv.core.controllers.cssBackgroundStylesController = function ($scope) {
    'use strict';

    var retinaAllowed = device.useRetinaImages();

    $scope.backgroundImage = {};
    $scope.styleStr = false;

    $scope.lres = 'lres';
    $scope.phoneLres = 'phoneLres';
    $scope.hres = retinaAllowed ? 'hres': 'lres';
    $scope.phoneHres = retinaAllowed ? 'phoneHres' : 'phoneLres';

    //TODO: Move any methods/functions below into a singleton service for efficiency
    $scope.cssBackgroundStyles = intv.core.cssBackgroundStyles;
};

intv.core.controllers.cssBackgroundStylesController.$inject = [ "$scope",'device'];
console.log("loaded cssBackgroundStylesController");