// core/controlers/css-background-styles-ctrl
// Usage: as module ng-controller="cssBackgroundStylesController", as POJO ng-controller="intv.core.controllers.cssBackgroundStylesController"
NSfn.namespace('intv.core').controllers = intv.core.controllers || angular.module('intv.core.controllers', []);

//TODO Move cssBackgroundStyles method into a service and inject it
intv.core.cssBackgroundStyles = function cssBackgroundStyles (model, selector) {
    if (this.backgroundImage !== model.backgroundImage) {
        this.backgroundImage = model.backgroundImage;

        this.styleStr =
            selector + ' { background-image: url(' + this.backgroundImage[this.lres] + ');}' +

                '@media only screen and (min-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {' +
                selector + ' {background-image: url(' + this.backgroundImage[this.hres] + ');}}' +

                '@media only screen and (max-width: 767px), only screen and (orientation: landscape) and (max-device-width: 1024px) and (max-device-height: 767px) {' +
                selector + ' {background-image: url(' + this.backgroundImage[this.phoneLres]+ ');}}' +

                '@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {' +
                selector + ' {background-image: url(' + this.backgroundImage[this.phoneHres] + ');}}';

        console.log("setting cssBackgroundStyles");
    }
    return this.styleStr;
};

intv.core.controllers.cssBackgroundStylesController = function ($scope) {
    'use strict';

    //TODO:  Use device configuration to enable retina images
    var retinaAllowed = false,
        imageType = $scope.imageType,
        image = $scope.image;

    //Normalize background image styles
    image.backgroundImage = {lres:image[imageType].single_res,
                              hres:image[imageType].double_res,
                              phoneLres:image.program.single_res,
                              phoneHres:image.program.double_res};

    $scope.styleStr = false;

    $scope.lres = 'lres';
    $scope.phoneLres = 'phoneLres';
    $scope.hres = retinaAllowed ? 'hres': 'lres';
    $scope.phoneHres = retinaAllowed ? 'phoneHres' : 'phoneLres';

    //TODO: Move any methods/functions below into a singleton service for efficiency
    $scope.cssBackgroundStyles = intv.core.cssBackgroundStyles;
};

intv.core.controllers.cssBackgroundStylesController.$inject = [ "$scope"];

console.log("loaded cssBackgroundStylesController");