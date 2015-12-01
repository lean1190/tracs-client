/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$cordovaOauth"];

    function LoginController($cordovaOauth) {
        var vm = this;

        activate();

        function activate() {}

        vm.googleLogin = function () {
            $cordovaOauth.google(
                "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                [
                    "https://www.googleapis.com/auth/urlshortener",
                    "https://www.googleapis.com/auth/plus.me",
                    "https://www.googleapis.com/auth/plus.login",
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile"
                ]
            ).then(function (result) {
                console.log(JSON.stringify(result));
            }, function (error) {
                console.log(error);
            });
        };
    }

})();
