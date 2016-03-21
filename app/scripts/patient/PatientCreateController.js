/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientCreateController
 * @description
 * Controlador que maneja la validación y creación de un nuevo paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientCreateController", PatientCreateController);

    PatientCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory"];

    function PatientCreateController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory) {

        var vm = this;

        vm.createPatient = function () {

            var creatorId = localStorageService.get("user")._id;

            PatientFactory.createPatient(vm.patient, creatorId).then(function () {
                $cordovaToast.showLongBottom("Paciente creado!").then(function () {
                   $state.go("app.patientHome");
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al guardar el paciente, intentalo de nuevo");
            });

        };
    }
})();
