/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:ImAPatientHomeController
 * @description
 * Controlador que maneja la vista de paciente, esto incluye
 * el número telefónico de las personas cercanas y la posibilidad
 * de enviar un alerta georreferenciada
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("ImAPatientHomeController", ImAPatientHomeController);

    ImAPatientHomeController.$inject = ["$log", "$state", "$cordovaToast", "localStorageService", "dialer", "$cordovaGeolocation"];

    function ImAPatientHomeController($log, $state, $cordovaToast, localStorageService, dialer, $cordovaGeolocation) {

        var vm = this;

        vm.patient = localStorageService.get("patientUser");

        vm.callPhoneNumber = function(phoneNumber) {
            dialer.callNumber(function() {}, function(error) {
                $log.error("No se pudo realizar la llamada al número " + phoneNumber, error);
                $cordovaToast.showLongBottom("No se pudo realizar la llamada! Hay señal?");
            }, phoneNumber, false);
        };


        //Importante: Prender el GPS del emulador
        vm.myPosition = function(){

            var options = { timeout: 80000, enableHighAccuracy: true, maximumAge: 10000 };
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        };

        //onSuccess del navigator.geolocation.getCurrentPosition
        var onSuccess = function(position) {

            vm.patientPosition ={};

            //Armo el paquete con la info de la posicion del paciente. Seguramente necesitemos solo latitud, longitud y timestamp, pero despues termino de verlo.
            vm.patientPosition.latitude =  position.coords.latitude;
            vm.patientPosition.longitude = position.coords.longitude;
            vm.patientPosition.altitude = position.coords.altitude;
            vm.patientPosition.accuracy = position.coords.accuracy;
            vm.patientPosition.altitudeAccuracy = position.coords.altitudeAccuracy;
            vm.patientPosition.heading = position.coords.heading;
            vm.patientPosition.speed = position.coords.speed;
            vm.patientPosition.timestamp = position.timestamp;

            console.log(vm.patientPosition);
        }

        // onError del navigator.geolocation.getCurrentPosition
        var onError = function (error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
        }

    }
})();
