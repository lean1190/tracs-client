/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$cordovaOauth"];

    function LoginController($scope, $cordovaOauth) {
        var vm = this;
        vm.googleLogin = googleLogin;

        activate();

        function activate() {
        }

        function googleLogin() {
            $cordovaOauth.google(
                "1017723616061-0j8b19bv9tgau6cku7mpq6cb4hh7j9ah.apps.googleusercontent.com",
                ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]
            ).then(function (result) {
                console.log(JSON.stringify(result));
            }, function (error) {
                console.log(error);
            });
        }

    }

})();
