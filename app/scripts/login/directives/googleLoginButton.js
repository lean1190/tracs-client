/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc directive
 * @name TracsClient.directives:GoogleLoginButtonDirective
 * @description
 * Directiva para mostrar y disparar el login con Google
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.directives")
        .directive("googleLoginButton", GoogleLoginButtonDirective);

    GoogleLoginButtonDirective.$inject = [];

    function GoogleLoginButtonDirective() {
        return {
            restrict: "E",
            replace: false,
            templateUrl: "templates/login/googleLoginButton.html",
            link: function (scope, elem) {
                elem.bind("click", function () {
                    scope.vm.login();
                });
            }
        };
    }

}());
