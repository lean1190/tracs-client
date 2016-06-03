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

    PatientDiagnosisCreateController.$inject = ["$stateParams", "$state", "$cordovaToast", "storage", "PatientFactory", "MenuFactory"];

    function PatientDiagnosisCreateController($stateParams, $state, $cordovaToast, storage, PatientFactory, MenuFactory) {

        var vm = this;

        vm.patientDiagnosis = {
            name: "",
            description: ""
        };

        /**
         * Valida que los campos obligatorios hayan sido completados
         * @returns {boolean} true si la validación pasa
         */
        function isValid() {
            if (vm.patientDiagnosis.name === "") {
                $cordovaToast.showLongBottom("El diagnóstico es obligatorio");
                return false;
            }
            if (vm.patientDiagnosis.description === "") {
                $cordovaToast.showLongBottom("La descripción es obligatoria");
                return false;
            }

            return true;
        }

        vm.createDiagnosis = function () {
            if (isValid()) {
                vm.patientDiagnosis.patient = storage.getLastVisitedPatient()._id;
                vm.patientDiagnosis.madeBy = storage.getUser()._id;

                PatientFactory.addPatientDiagnosis(vm.patientDiagnosis.patient, vm.patientDiagnosis).then(function () {
                    $cordovaToast.showLongBottom("El diagnóstico fue creado correctamente").then(function () {
                        MenuFactory.clearRightButtonAction();
                        $state.go("app.patientDiagnosis");
                    });
                }, function () {
                    $cordovaToast.showLongBottom("Ocurrió un error al recuperar el diagnóstico del paciente, intentalo de nuevo");
                });
            }
        };

        function activate() {
            MenuFactory.clearRightButtonAction();

            // Muestra el check para guardar al paciente
            MenuFactory.activateRightButtonAction(function () {
                vm.createDiagnosis();
            });

            // Cuando apretamos atrás se borra el check y su funcionalidad
            MenuFactory.setBackButtonAction(function () {
                MenuFactory.clearRightButtonAction();
            });
        }

        activate();

    }
})();
