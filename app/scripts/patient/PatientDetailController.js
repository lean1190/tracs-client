/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$stateParams", "$state", "$cordovaToast", "localStorageService", "PatientFactory"];

    function PatientDetailController($stateParams, $state, $cordovaToast, localStorageService, PatientFactory) {

        var vm = this;
        var patientId = $stateParams.id;
        vm.patient = {};

        activate();

        function activate() {
            PatientFactory.getPatientDetail(patientId).then(function (result) {
                vm.patient = result;
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar la información del paciente, intentalo de nuevo");
            });

        }

        vm.updatePatient = function () {
            var updatedPatient = vm.patient;

            PatientFactory.updatePatientDetail(updatedPatient).then(function (result) {
                $cordovaToast.showLongBottom("Paciente actualizado correctamente!").then(function () {
                    $state.go("app.patientHome");
                });
            }, function (err) {
                console.log("exploto", err);
                $cordovaToast.showLongBottom("Ocurrió un error al editar al paciente, intentalo de nuevo");
            });

        };
    }
})();
