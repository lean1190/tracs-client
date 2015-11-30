"use strict";

(function () {

    angular
        .module("TracsClient.directives")
        .directive("googleLoginButton", GoogleLoginButtonDirective);

    GoogleLoginButtonDirective.$inject = [];

    function GoogleLoginButtonDirective() {
        return {
            restrict: "E",
            replace: false,
            templateUrl: "/templates/login/googleLoginButton.html",
            link: function (scope, elem, attrs) {
                elem.bind("click", function () {
                    scope.vm.googleLogin();
                });
            }
        };
    }

}());
