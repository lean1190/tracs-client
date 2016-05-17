(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientMedicationCreateController", PatientMedicationCreateController);

    PatientMedicationCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","DiagnosisFactory","MenuFactory"];

    function PatientMedicationCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory, MenuFactory) {

        var vm = this;

        vm.diagnosisId = $stateParams.id;
        console.log(vm.diagnosisId);
        vm.medication = {};
        vm.patient = storage.getLastVisitedPatient();

        vm.createMedication = function(){

            DiagnosisFactory.addDiagnosisMedication(vm.medication, vm.diagnosisId).then(function () {
                $cordovaToast.showLongBottom("La medicación fue agregada exitosamente!").then(function () {
                        MenuFactory.clearRightButtonAction();
                        $state.go("app.patientDiagnosis");
                    });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al agregar la medicación, intentalo de nuevo");
            });
        };

        function activate() {
            // Muestra el check para guardar al paciente
            MenuFactory.activateRightButtonAction(function () {
                vm.createMedication();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });
        }

        activate();


    }

})();
