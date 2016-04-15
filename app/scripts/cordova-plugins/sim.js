"use strict";

/**
 * @ngdoc function
 * @name TracsClient:sim
 * @external https://github.com/pbakondy/cordova-plugin-sim
 * @description
 * Expone el plugin cordova-plugin-sim como un factory inyectable
 * Este plugin permite recuperar información del teléfono donde se
 * ejecuta la aplicación, como el número de teléfono, el carrier,
 * el código de país, etc.
 */

(function () {
    angular
        .module("TracsClient")
        .factory("sim", function ($window) {
            return $window.plugins.sim;
        });
})();
