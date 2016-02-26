/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

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

    LogoutController.$inject = ["$state", "localStorageService"];

    function LogoutController($state, localStorageService) {

        activate();

        function activate() {
            // Borra los datos del localStorage
            localStorageService.set("user", null);
            localStorageService.clearAll();
            // Redirige al login
            $state.go("app.login");
        }
    }

})();
