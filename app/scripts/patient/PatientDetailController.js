/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$stateParams", "$state", "$cordovaToast", "$ionicHistory", "localStorageService", "PatientFactory"];

    function PatientDetailController($stateParams, $state, $cordovaToast, $ionicHistory, localStorageService, PatientFactory) {

        var vm = this,
            patientId = $stateParams.id;

        vm.patient = {};

        activate();

        function activate() {

            // Recupera todos los datos del paciente
            PatientFactory.getPatientDetail(patientId).then(function (resultPatient) {
                vm.patient = resultPatient;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });
        }

        vm.updatePatient = function () {
            var updatedPatient = vm.patient;

            PatientFactory.updatePatientDetail(updatedPatient).then(function () {
                $cordovaToast.showLongBottom("Paciente actualizado correctamente!").then(function () {
                    $state.go("app.patientHome");
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al editar al paciente, intentalo de nuevo");
            });

        };
    }
})();
