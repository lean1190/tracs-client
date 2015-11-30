/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular, console */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$cordovaOauth"];

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str) {
            return this.indexOf(str) == 0;
        };
    }

    function LoginController($cordovaOauth) {
        var vm = this;

        activate();

        function activate() {}

        vm.googleLogin = function () {
            console.log("llegando al controller googleLogin...");
            //window.open('http://www.twitter.com', '_blank', 'location=no');

            var clientId = "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com";
            $cordovaOauth.google(
                "1017723616061-btjadg1pe5tug819i8b3sffek1klev6m.apps.googleusercontent.com",
                ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]
            ).then(function (result) {
                console.log(JSON.stringify(result));
            }, function (error) {
                console.log(error);
            });
            /*var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
            ref.addEventListener('loadstart', function (event) {
                if ((event.url).startsWith("http://localhost/callback")) {
                    requestToken = (event.url).split("code=")[1];
                    console.log("### requestToken", requestToken);
                    ref.close();
                } else {
                    console.log("### entro al else, wtf?!");
                }
            });*/
        };
    }

})();
