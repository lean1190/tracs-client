(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientMedicationCreateController", PatientMedicationCreateController);

    PatientMedicationCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","DiagnosisFactory"];

    function PatientMedicationCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory) {

        var vm = this;

        vm.diagnosisId = $stateParams.id;
        vm.medication = {};
        vm.patient = storage.getLastVisitedPatient();

        vm.createMedication = function(){

            DiagnosisFactory.addDiagnosisMedication(vm.medication, vm.diagnosisId).then(function () {
                $cordovaToast.showLongBottom("La medicación fue agregada exitosamente!");
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al agregar la medicación, intentalo de nuevo");
            });
        };
    }

})();
