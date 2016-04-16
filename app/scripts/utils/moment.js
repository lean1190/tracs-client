"use strict";

/**
 * @ngdoc function
 * @name TracsClient:moment
 * @external http://momentjs.com/docs/
 * @description
 * Expone moment como un inyectable, asi no hay que usar
 * el espacio global de variables ni window
 */

(function () {
    angular
        .module("TracsClient")
        .factory("moment", function ($window) {
            return $window.moment;
        });
})();
