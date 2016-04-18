/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:MenuController
 * @description
 * Controlador que maneja la información del usuario que se muestra en el menú
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("MenuController", MenuController);

    MenuController.$inject = ["$scope", "$rootScope", "$ionicSideMenuDelegate", "storage"];

    function MenuController($scope, $rootScope, $ionicSideMenuDelegate, storage) {

        var vm = this;
        vm.user = storage.getUser() || storage.getPatientUser();
        vm.imAtPatientHome = true;

        console.log("### Menu user", vm.user);

        /**
         * Suscripción al evento "state.changed.patientHome", que se ejecuta cuando
         * entra al patient home con el listado de pacientes
         */
        $rootScope.$on("state.changed.patientHome", function (event, state) {
            vm.imAtPatientHome = state;
        });

        vm.closeMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

})();
