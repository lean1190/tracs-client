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

    LoginController.$inject = ["$cordovaOauth", "$http", "LoginFactory"];

    function LoginController($cordovaOauth, $http, LoginFactory) {

        var vm = this;

        activate();

        function activate() {}

        vm.login = function () {
            LoginFactory.authorize({
                clientId: "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                clientSecret: "McJIjSQt4aRNL_lLO8xSUBOe",
                redirectUri: "http://localhost",
                scopes: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            }).then(function(user) {
                console.log("Que llega al controller??", user);
                vm.user = user;
            }, function(error) {
                console.log("Error en el login con Google", error);
            });
        };
    }

})();
