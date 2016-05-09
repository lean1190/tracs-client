/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:Diagnosis
 * @description
 * Controlador que maneja la administracion del diagnostico de un paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDiagnosisController", PatientDiagnosisController);

    PatientDiagnosisController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","DiagnosisFactory"];

    function PatientDiagnosisController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory) {

        var vm = this;

        vm.patient = {};
        vm.patientDiagnosis = {};

        activate();

        function activate() {

            vm.patient = storage.getLastVisitedPatient();

            PatientFactory.getPatientDiagnosis(vm.patient._id).then(function(result) {

                vm.patientDiagnosis = result;

            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar el diagnóstico del paciente, intentalo de nuevo");
            });
        }

        vm.medicationCreate = function(){

            $state.go("app.patientMedicationCreate", { id: vm.patientDiagnosis._id })

        };


    }

})();
