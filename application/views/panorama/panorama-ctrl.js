// application/views/panorama/panorama-ctl.js
// Usage: as module ng-controller="PanoramaCtrl", as POJO ng-controller="intv.app.views.panorama.PanoramaCtrl"
NSfn.namespace('intv.app.views').panorama = intv.app.views.panorama || angular.module('intv.app.views.panorama', []);

intv.app.views.panorama.PanoramaCtrl = function PanoramaCtrl(){
    console.log('Panorama Controller instantiated', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));
};

console.log('loaded panorama controller', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));