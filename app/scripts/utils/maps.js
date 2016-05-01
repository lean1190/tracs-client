"use strict";

/**
 * @ngdoc function
 * @name TracsClient:moment
 * @description
 * Expone google.maps como un inyectable, asi no hay que usar
 * el espacio global de variables ni window
 */

(function () {
    angular
        .module("TracsClient")
        .factory("maps", function ($window) {
            return $window.google.maps;
        });
})();
