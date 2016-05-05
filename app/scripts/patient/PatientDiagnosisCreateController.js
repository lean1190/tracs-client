/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:Diagnosis
 * @description
 * Controlador que maneja la creacion del diagnostico de un paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientDiagnosisCreateController", PatientDiagnosisCreateController);

    PatientDiagnosisCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory"];

    function PatientDiagnosisCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory) {

        var vm = this;

        vm.patient = storage.getLastVisitedPatient();

        vm.createDiagnosis = function(){

            vm.patientDiagnosis.patient = vm.patient._id;

            PatientFactory.addPatientDiagnosis(vm.patient._id, vm.patientDiagnosis).then(function(result) {
                $cordovaToast.showLongBottom("El diagnóstico de " + vm.patient.name + " fue creado correctamente");
            }, function() {
                $cordovaToast.showLongBottom("Ocurrió un error al recuperar el diagnóstico del paciente, intentalo de nuevo");
            });
        }
    }
})();
