'use strict';

describe('Controller: PanoramaCtrl', function () {

    // load the controller's module
    beforeEach(module('intv.app.views.panorama'));

    var PanoramaCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PanoramaCtrl = $controller('PanoramaCtrl', {
            $scope: scope
        });
    }));

    it('should have the appropriate assets in the model', function () {
        expect(scope.model.assets[0].program_id) .toBe("1350491");
    });
});
