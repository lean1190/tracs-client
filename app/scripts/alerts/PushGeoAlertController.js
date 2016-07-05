/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PushGeoAlertController
 * @description
 * Controlador que maneja una notificacion push
 * para un alerta georreferenciada
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PushGeoAlertController", PushGeoAlertController);

    PushGeoAlertController.$inject = ["$scope", "$stateParams", "$state", "$log", "$cordovaToast", "$ionicPlatform", "dialer"];

    function PushGeoAlertController($scope, $stateParams, $state, $log, $cordovaToast, $ionicPlatform, dialer) {

        var vm = this;
        vm.patient = $stateParams.patient;
        vm.coordinates = $stateParams.coordinates;

        vm.call = function() {
            var phoneNumber = vm.patient.phoneNumber;
            dialer.callNumber(function () {}, function (error) {
                $log.error("No se pudo realizar la llamada al número " + phoneNumber, error);
                $cordovaToast.showLongBottom("No se pudo realizar la llamada! Hay señal?");
            }, phoneNumber, false);
        };

        vm.seeMap = function() {
            $state.go("app.geoAlertMap", {
                latitude: vm.coordinates.latitude,
                longitude: vm.coordinates.longitude
            });
        };

    }

})();
