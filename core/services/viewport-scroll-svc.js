/*
 * Viewport Scrolling Services
 * - An angular service that aids in determining if an
 * element is in the viewport based on it's current location
 * and an optional threshold value useful in loading elements
 * that are just off screen.
 *
 * the service can also detect if the element was was viewable
 * for more than 2.5 seconds
 *
 */

NSfn.namespace('intv.core').services = intv.core.services || angular.module('intv.core.services', []);

intv.core.services.service('ViewPortServices', function () {
    'use strict';

    //Check to see if element was really viewed
    this.elementInViewPortThresholdMet = function elementInViewPortThresholdMet (scope) {
        //Was I in view for viewDuration seconds?
        var currentTimestamp = new Date().getTime();
        if ((scope.timestamp + 2500) <= currentTimestamp) {
            scope.timestamp = currentTimestamp;
            return true;
        }
        return false;
    },

        //Check to see if element is in viewport
        this.elementInViewPort = function elementInViewPort(el, threshold /* {x,y} */){
            var r, html;
            threshold = threshold || {"x":0,"y":0};

            if ( !el || 1 !== el.nodeType ) { return false; }
            html = document.documentElement;
            r = el.getBoundingClientRect();

            return ( !!r
                && r.bottom >= 0
                && r.right  >= 0
                && r.top    <= (html.clientHeight - threshold.y)
                && r.left   <= (html.clientWidth  - threshold.x)
                );
        }

});
