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

    PatientDiagnosisController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "DiagnosisFactory", "MenuFactory"];

    function PatientDiagnosisController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory, MenuFactory) {

        var vm = this;

        vm.patient = {};
        vm.patientDiagnosis = {};
        vm.createMedicationLink =


        vm.createMedicationLink = function(){

            $state.go("app.patientMedicationCreate", { id: vm.patientDiagnosis._id});

        };

        vm.changeToDiagnosisTab = function () {

            MenuFactory.clearRightButtonAction();

            vm.editOn = false;

            if (vm.patient.latestDiagnosis) {
                // Muestra el lapiz para editar la nota del paciente
                MenuFactory.activateRightEditButtonAction(function () {
                    vm.editDiagnosisTab();
                });
            }
        };

        vm.changeToMedicationTab = function () {
            vm.editOn = false;
            MenuFactory.clearRightButtonAction();
        };

        vm.changeToHistoryTab = function () {
            vm.editOn = false;

            MenuFactory.clearRightButtonAction();

            if (vm.patient.history) {

                // Muestra el lapiz para editar la nota del paciente
                MenuFactory.activateRightEditButtonAction(function () {
                    vm.editHistoryTab();
                });
            }
        };

        vm.editDiagnosisTab = function () {
            vm.editOn = true;

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.updateDiagnosis();
            });
        };

        vm.editHistoryTab = function () {

            vm.editOn = true;

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.updateHistory();
            });
        };


        vm.updateDiagnosis = function () {
            DiagnosisFactory.updateDiagnosis(vm.patientDiagnosis, vm.patient.latestDiagnosis).then(function () {
                $cordovaToast.showLongBottom("Diagnóstico Actualizado!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.reload();
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al actualizar el diagnóstico del paciente, intentalo de nuevo");
            });
        };

        vm.updateHistory = function () {

            PatientFactory.updatePatientHistory(vm.patientHistory, vm.patient._id).then(function () {

                $cordovaToast.showLongBottom("Historia del paciente Actualizada!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.reload();
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al actualizar la historia del paciente, intentalo de nuevo");
            });
        };

        vm.deleteDiagnosisMedication = function(medicationId){

            DiagnosisFactory.deleteDiagnosisMedication(vm.patientDiagnosis._id, medicationId).then(function(){

                $cordovaToast.showLongBottom("La medicación fue eliminada!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.reload();
                });
            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al borrar la medicación, intentalo de nuevo");
            });

        };

        function activate() {

            vm.patient = storage.getLastVisitedPatient();
            vm.changeToDiagnosisTab();

            // Cuando apretamos atrás se borra el boton y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });

            if (vm.patient.latestDiagnosis) {

                DiagnosisFactory.getDiagnosis(vm.patient.latestDiagnosis).then(function (diagnosis) {

                    vm.patientDiagnosis = diagnosis;

                    DiagnosisFactory.getDiagnosisMedication(vm.patientDiagnosis._id).then(function (result) {

                        vm.patientMedications = result;

                    }, function () {
                        $cordovaToast.showLongBottom("Ocurrió un error al recuperar la medicación del paciente, intentalo de nuevo");
                    });

                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al recuperar el diagnóstico del paciente, intentalo de nuevo");
                });
            }
        }

        activate();

    }

})();
