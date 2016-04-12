/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDetailController", PatientDetailController);

    PatientDetailController.$inject = ["$stateParams", "$state", "$cordovaToast", "$ionicHistory", "storage", "PatientFactory"];

    function PatientDetailController($stateParams, $state, $cordovaToast, $ionicHistory, storage, PatientFactory) {

        var vm = this;

        vm.patient = {};

        activate();

        function activate() {
            vm.patient = storage.getLastVisitedPatient();
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
