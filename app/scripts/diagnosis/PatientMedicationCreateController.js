(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientMedicationCreateController", PatientMedicationCreateController);

    PatientMedicationCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "DiagnosisFactory", "MenuFactory"];

    function PatientMedicationCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory, MenuFactory) {

        var vm = this;

        vm.diagnosisId = $stateParams.id;
        vm.patient = storage.getLastVisitedPatient();
        vm.user = storage.getUser();

        vm.medication = {
            drug: "",
            dosis: "",
            frequence: "",
            date: ""
        };

        function isValid() {
            if(vm.medication.drug === "") {
                $cordovaToast.showLongBottom("El nombre del medicamento es requerido");
                return false;
            }

            if(vm.medication.dosis === "") {
                $cordovaToast.showLongBottom("La dosis es requerida");
                return false;
            }

            if(vm.medication.frequence === "") {
                $cordovaToast.showLongBottom("La frecuencia es requerida");
                return false;
            }

            if(vm.medication.date === "") {
                $cordovaToast.showLongBottom("La fecha de prescripción es requerida");
                return false;
            }

            return true;
        }

        vm.createMedication = function () {
            if (isValid()) {

                vm.medication.prescribedBy = vm.user._id;
                vm.medication.diagnosis = vm.diagnosisId;

                DiagnosisFactory.addDiagnosisMedication(vm.medication, vm.diagnosisId).then(function () {
                    $cordovaToast.showLongBottom("La medicación fue agregada exitosamente!").then(function () {
                        MenuFactory.clearRightButtonAction();
                        $state.go("app.patientDiagnosis");
                    });

                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al agregar la medicación, intentalo de nuevo");
                });
            }
        };

        function activate() {
            MenuFactory.clearRightButtonAction();

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
