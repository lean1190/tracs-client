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

    MenuController.$inject = ["$scope", "$rootScope", "storage"];

    function MenuController($scope, $rootScope, storage) {

        var vm = this;
        vm.user = {};
        vm.imAtPatientHome = true;

        /**
         * Suscripción al evento "user.changed", que se ejecuta cuando
         * cambiaron los datos de usuario en la sesión
         */
        $rootScope.$on("user.changed", function () {
            // Asigna el usuario logueado
            vm.user = storage.getUser();
        });

        /**
         * Suscripción al evento "state.changed.patientHome", que se ejecuta cuando
         * entra al patient home con el listado de pacientes
         */
        $rootScope.$on("state.changed.patientHome", function (event, state) {
            vm.imAtPatientHome = state;
        });
    }

})();
