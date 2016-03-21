"use strict";

/**
 * @ngdoc function
 * @name TracsClient:dialer
 * @external https://github.com/Rohfosho/CordovaCallNumberPlugin
 * @description
 * Expone el plugin mx.ferreyra.callnumber como un factory inyectable
 * Este plugin permite llamar a un número de teléfono directamente
 * desde la aplicación, sin necesidad de pasar por el dialer
 * como sería usando el método href="tel:"
 */

(function () {
    angular
        .module("TracsClient")
        .factory("dialer", function ($window) {
            return $window.plugins.CallNumber;
        });
})();
