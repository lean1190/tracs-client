/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:LoginController
 * @description
 * Controlador que maneja el login y logout de un usuario
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$http", "$location", "LoginFactory"];

    function LoginController($http, $location, LoginFactory) {

        var vm = this;

        /**
         * Dispara la autenticación con Google en la aplicación,
         * pidiendo permisos de acceso y validando los datos con
         * el servidor
         */
        vm.login = function () {
            LoginFactory.login({
                clientId: "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                clientSecret: "McJIjSQt4aRNL_lLO8xSUBOe",
                redirectUri: "http://localhost",
                scopes: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            }).then(function() {
                console.log("$$$ Login exitoso!");
                $location.path("/patient/home");
            }, function(error) {
                console.error(error.message, error.raw);
            });
        };
    }

})();
