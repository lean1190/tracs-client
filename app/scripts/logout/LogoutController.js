/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:LogoutController
 * @description
 * Controlador que maneja el logout de un usuario
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LogoutController", LogoutController);

    LogoutController.$inject = ["$state", "localStorageService", "storage"];

    function LogoutController($state, localStorageService, storage) {

        activate();

        function activate() {
            // Borra los datos del localStorage
            storage.setUser(null);
            storage.setPatientUser(null);
            localStorageService.clearAll();
            // Redirige al login
            $state.go("signin.login");
        }
    }

})();
