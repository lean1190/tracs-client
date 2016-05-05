/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc directive
 * @name TracsClient.directives:FloatingButtonDirective
 * @description
 * Directiva para mostrar un botón flotante en una vista
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.directives")
        .directive("floatingButton", FloatingButtonDirective);

    FloatingButtonDirective.$inject = [];

    function FloatingButtonDirective() {
        return {
            restrict: "E",
            replace: false,
            templateUrl: "templates/layout/floatingButton.directive.html",
            scope: {
                state: "=",
                text: "="
            }
        };
    }

}());
