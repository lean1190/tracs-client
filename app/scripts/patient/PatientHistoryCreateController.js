/* jshint bitwise: false, camelcase: false, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, latedef: nofunc */

/* globals angular */

/**
 * @ngdoc function
 * @name TracsClient.controllers:PatientHistoryCreateController
 * @description
 * Controlador que maneja la validación y creación de la historia de un paciente
 */

(function () {
    "use strict";

    angular
        .module("TracsClient.controllers")
        .controller("PatientHistoryCreateController", PatientHistoryCreateController);

    PatientHistoryCreateController.$inject = ["$scope", "$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "MenuFactory"];

    function PatientHistoryCreateController($scope, $stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory) {

        var vm = this;

        vm.patient = {};

        vm.patientHistory = {

            description: "",
            prevTherapyPlace: "",
            prevTherapyDuration: ""
        };

        /**
         * Valida que los campos obligatorios hayan sido completados
         * @returns {boolean} true si la validación pasa
         */
        function isValid() {
            if (vm.patientHistory.prevTherapyPlace === "") {
                $cordovaToast.showLongBottom("La descripción de la historia del paciente es obligatorio");
                return false;
            }
            if (vm.patientHistory.prevTherapyPlace === "") {
                $cordovaToast.showLongBottom("El establecimiento del tratamiento anterior es obligatorio");
                return false;
            }
            if (vm.patientHistory.prevTherapyDuration === "") {
                $cordovaToast.showLongBottom("La duracion del tratamiento anterior es obligatorio");
                return false;
            }

            return true;
        }

        vm.createPatientHistory = function () {
            if (isValid()) {
                var patientId = storage.getLastVisitedPatient()._id;

                PatientFactory.updatePatientHistory(vm.patientHistory, patientId).then(function () {
                    $cordovaToast.showLongBottom("Historia del paciente creada!").then(function () {

                        MenuFactory.clearRightButtonAction();

                        vm.patient.history = vm.patientHistory;
                        storage.setLastVisitedPatient(vm.patient);
                        $state.go("app.patientDiagnosis");

                    });
                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al guardar la historia del paciente, intentalo de nuevo");
                });
            }
        };

        function activate() {
            // Muestra el check para guardar al paciente

            vm.patient = storage.getLastVisitedPatient();

            MenuFactory.clearRightButtonAction();

            MenuFactory.activateRightButtonAction(function () {
                vm.createPatientHistory();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });
        }

        activate();
    }
})();
