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

    PatientDiagnosisController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory","DiagnosisFactory","MenuFactory"];

    function PatientDiagnosisController($stateParams, $state, $cordovaToast, storage, PatientFactory, DiagnosisFactory, MenuFactory) {

        var vm = this;

        vm.patient = {};
        vm.patientDiagnosis = {};

        activate();

        function activate() {

            vm.patient = storage.getLastVisitedPatient();

            vm.editOn = false;

            if(vm.patient.latestDiagnosis){

                // Muestra el lapiz para editar la nota del paciente
                MenuFactory.activateRightEditButtonAction(function () {
                    vm.editFields();
                });

                // Cuando apretamos atrás se borra el boton y su funcionalidad
                MenuFactory.setBackButtonAction(function () {
                    MenuFactory.clearRightButtonAction();
                });

                DiagnosisFactory.getDiagnosis(vm.patient.latestDiagnosis).then(function(diagnosis) {

                    vm.patientDiagnosis = diagnosis;

                    DiagnosisFactory.getDiagnosisMedication(vm.patientDiagnosis._id).then(function(result){

                        vm.patientMedications = result.medications;

                    },function() {
                        $cordovaToast.showLongBottom("Ocurrió un error al recuperar la medicación del paciente, intentalo de nuevo");
                    });

                }, function() {
                    $cordovaToast.showLongBottom("Ocurrió un error al recuperar el diagnóstico del paciente, intentalo de nuevo");
                });
            }
        }

        vm.medicationCreate = function(){

            MenuFactory.clearRightButtonAction();
            $state.go("app.patientMedicationCreate", { id: vm.patientDiagnosis._id });

        };

        vm.editFields = function(){

            vm.editOn = true;

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.updateDiagnosis();
            });
        }

        vm.updateDiagnosis = function(){

            DiagnosisFactory.updateDiagnosis(vm.patientDiagnosis, vm.patient.latestDiagnosis).then(function (result) {

                $cordovaToast.showLongBottom("Diagnóstico Actualizado!").then(function () {
                    MenuFactory.clearRightButtonAction();
                    $state.reload();
                });


            }, function () {
                $cordovaToast.showLongBottom("Ocurrió un error al actualizar el diagnóstico del paciente, intentalo de nuevo");
            });
        }
    }

})();
