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

        /**
         * Suscripción al evento "user.changed", que se ejecuta cuando
         * cambiaron los datos de usuario en la sesión
         */
        var userChangedEvent = $rootScope.$on("user.changed", function () {
            // Asigna el usuario logueado
            vm.user = storage.getUser();
        });

        /**
         * Dessucbribe el evento para evitar leaks de memoria
         */
        $scope.$on("$destroy", userChangedEvent);
    }

})();
