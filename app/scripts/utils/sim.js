"use strict";

/**
 * @ngdoc function
 * @name TracsClient:sim
 * @description
 * Expone el plugin cordova-plugin-sim como un factory inyectable
 */

(function () {
    angular
        .module("TracsClient")
        .factory("sim", function ($window) {
            return $window.plugins.sim;
        });
})();
