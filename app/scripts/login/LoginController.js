/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

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

        // Con esto recuperamos los datos del usuario y el access_token,
        // toy probando hacerlo en el servidor, porque aca no puedo recuperar
        // el refresh_token
        function conCordovaOauth() {
            $cordovaOauth.google(
                "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com", [
                    "https://www.googleapis.com/auth/urlshortener",
                    "https://www.googleapis.com/auth/plus.me",
                    "https://www.googleapis.com/auth/plus.login",
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile"
                ], {
                    'access_type': 'offline',
                    'approval_prompt': 'force'
                }
            ).then(function (result) {
                console.log("result", JSON.stringify(result));
                $http({
                    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
                    method: 'GET',
                    params: {
                        access_token: result.access_token
                    }
                }).success(function (aa) {
                    console.log("success userinfo", aa);
                }).error(function (aa) {
                    console.log("error userinfo", aa);
                });
            }, function (error) {
                console.log(error);
            });
        }

        vm.googleLogin = function () {
            LoginFactory.authorize({
                clientId: "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                clientSecret: "McJIjSQt4aRNL_lLO8xSUBOe",
                redirectUri: "http://localhost",
                scopes: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
            }).then(function(user) {
                vm.user = user;
            }, function(error) {
                console.log("Error en el login con Google", error);
            });
        };
    }

})();
