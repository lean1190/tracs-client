/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("TreatmentCreateController", TreatmentCreateController);

    TreatmentCreateController.$inject = [ /*TreatmentFactory,*/ "$stateParams"];

    function TreatmentCreateController( /*TreatmentFactory,*/ $stateParams) {
        var vm = this;
        vm.treatment = {};


    }

    function createTreatment() {
        /*return UserFactory.findUserById(userId).then(function (user) {
            vm.user = user;
        }, function (err) {
            console.log(err);
        });*/
    }
})();
