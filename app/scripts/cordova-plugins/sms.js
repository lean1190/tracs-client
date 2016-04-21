"use strict";

/**
 * @ngdoc function
 * @name TracsClient:sms
 * @external https://github.com/cordova-sms/cordova-sms-plugin
 * @description
 * Expone el plugin cordova-sms-plugin como un factory inyectable
 * Este plugin permite enviar sms a un número de teléfono
 * a través de la aplicación o una externa
 */

(function () {
    angular
        .module("TracsClient")
        .factory("sms", function ($window) {
            return $window.sms;
        });
})();
